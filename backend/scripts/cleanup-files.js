// scripts/cleanup-files.js
require('dotenv').config();
const fileService = require('../services/fileService');
const pool = require('../config/database');

class FileCleanupManager {
  constructor() {
    this.daysOld = parseInt(process.env.CLEANUP_DAYS_OLD) || 30;
    this.maxStorageMB = parseInt(process.env.MAX_STORAGE_MB) || 1000; // 1GB default
  }

  async performCleanup() {
    console.log('🧹 Starting file cleanup process...');
    
    try {
      // Get current storage usage
      const storageInfo = await fileService.getStorageUsage();
      console.log(`💾 Current storage usage: ${storageInfo.totalSizeMB}MB`);

      if (storageInfo.totalSizeMB > this.maxStorageMB) {
        console.log(`⚠️ Storage limit exceeded! (${storageInfo.totalSizeMB}MB > ${this.maxStorageMB}MB)`);
        await this.aggressiveCleanup();
      } else {
        console.log(`✅ Storage within limits (${storageInfo.totalSizeMB}MB < ${this.maxStorageMB}MB)`);
        await this.regularCleanup();
      }

      // Final storage report
      const finalStorage = await fileService.getStorageUsage();
      console.log(`📊 Final storage usage: ${finalStorage.totalSizeMB}MB`);
      
    } catch (error) {
      console.error('❌ Cleanup failed:', error);
      throw error;
    }
  }

  async regularCleanup() {
    console.log(`🗂️ Performing regular cleanup (files older than ${this.daysOld} days)...`);
    
    const result = await fileService.cleanupOldFiles(this.daysOld);
    console.log(`✅ Regular cleanup completed: ${result.deletedCount} files deleted`);
    
    return result;
  }

  async aggressiveCleanup() {
    console.log('🚨 Performing aggressive cleanup...');
    
    // Step 1: Clean files older than 15 days
    console.log('Step 1: Cleaning files older than 15 days...');
    let result = await fileService.cleanupOldFiles(15);
    console.log(`Deleted ${result.deletedCount} files from step 1`);

    // Check storage again
    let storageInfo = await fileService.getStorageUsage();
    
    if (storageInfo.totalSizeMB > this.maxStorageMB) {
      // Step 2: Clean files older than 7 days
      console.log('Step 2: Cleaning files older than 7 days...');
      result = await fileService.cleanupOldFiles(7);
      console.log(`Deleted ${result.deletedCount} files from step 2`);
      
      storageInfo = await fileService.getStorageUsage();
    }

    if (storageInfo.totalSizeMB > this.maxStorageMB) {
      // Step 3: Clean orphaned files (files not referenced in database)
      console.log('Step 3: Cleaning orphaned files...');
      const orphanedResult = await this.cleanOrphanedFiles();
      console.log(`Deleted ${orphanedResult.deletedCount} orphaned files`);
    }

    console.log('🚨 Aggressive cleanup completed');
  }

  async cleanOrphanedFiles() {
    try {
      // Get all file references from database
      const referencedFiles = new Set();
      
      // Check user profile pictures
      const users = await pool.query('SELECT profile_picture FROM users WHERE profile_picture IS NOT NULL');
      users.rows.forEach(user => {
        if (user.profile_picture) {
          referencedFiles.add(user.profile_picture);
        }
      });

      // Add more queries here for other file references as your app grows
      // Example: documents, booking attachments, etc.

      // Get all actual files
      const fs = require('fs-extra');
      const path = require('path');
      const uploadPath = process.env.UPLOAD_PATH || './uploads';
      
      const allFiles = [];
      const checkDirectory = async (dir, baseUrl) => {
        const files = await fs.readdir(dir);
        for (const file of files) {
          const filePath = path.join(dir, file);
          const stats = await fs.stat(filePath);
          if (stats.isFile()) {
            allFiles.push({
              filePath,
              url: `${baseUrl}/${file}`
            });
          }
        }
      };

      await checkDirectory(path.join(uploadPath, 'images'), '/uploads/images');
      await checkDirectory(path.join(uploadPath, 'documents'), '/uploads/documents');
      await checkDirectory(path.join(uploadPath, 'profiles'), '/uploads/profiles');

      // Find orphaned files
      const orphanedFiles = allFiles.filter(file => !referencedFiles.has(file.url));
      
      // Delete orphaned files
      for (const file of orphanedFiles) {
        await fs.remove(file.filePath);
      }

      return { deletedCount: orphanedFiles.length, deletedFiles: orphanedFiles };

    } catch (error) {
      console.error('Error cleaning orphaned files:', error);
      return { deletedCount: 0, deletedFiles: [] };
    }
  }

  async generateStorageReport() {
    const storageInfo = await fileService.getStorageUsage();
    
    const report = {
      timestamp: new Date().toISOString(),
      totalStorageMB: storageInfo.totalSizeMB,
      maxStorageMB: this.maxStorageMB,
      utilizationPercent: Math.round((storageInfo.totalSizeMB / this.maxStorageMB) * 100),
      breakdown: storageInfo.breakdown,
      recommendations: []
    };

    // Add recommendations
    if (report.utilizationPercent > 90) {
      report.recommendations.push('URGENT: Storage usage over 90%. Consider aggressive cleanup or storage upgrade.');
    } else if (report.utilizationPercent > 75) {
      report.recommendations.push('WARNING: Storage usage over 75%. Monitor closely.');
    } else if (report.utilizationPercent > 50) {
      report.recommendations.push('INFO: Storage usage over 50%. Consider regular cleanup schedule.');
    }

    return report;
  }

  async scheduleCleanup() {
    const CronJob = require('cron').CronJob;
    
    // Run cleanup every day at 2 AM
    const dailyCleanup = new CronJob('0 2 * * *', async () => {
      console.log('🕐 Running scheduled daily cleanup...');
      try {
        await this.performCleanup();
        console.log('✅ Scheduled cleanup completed successfully');
      } catch (error) {
        console.error('❌ Scheduled cleanup failed:', error);
      }
    });

    // Generate storage report every week at Sunday 1 AM
    const weeklyReport = new CronJob('0 1 * * 0', async () => {
      console.log('📊 Generating weekly storage report...');
      try {
        const report = await this.generateStorageReport();
        console.log('Weekly Storage Report:', JSON.stringify(report, null, 2));
        
        // You could send this report via email if needed
        // await emailService.sendStorageReport(report);
        
      } catch (error) {
        console.error('❌ Storage report generation failed:', error);
      }
    });

    dailyCleanup.start();
    weeklyReport.start();
    
    console.log('✅ File cleanup scheduler started');
    console.log('📅 Daily cleanup: Every day at 2:00 AM');
    console.log('📊 Weekly report: Every Sunday at 1:00 AM');
  }
}

// Command line interface
if (require.main === module) {
  const manager = new FileCleanupManager();
  const command = process.argv[2];

  switch (command) {
    case 'cleanup':
      manager.performCleanup()
        .then(() => {
          console.log('✅ Cleanup completed');
          process.exit(0);
        })
        .catch(error => {
          console.error('❌ Cleanup failed:', error);
          process.exit(1);
        });
      break;
      
    case 'report':
      manager.generateStorageReport()
        .then(report => {
          console.log('📊 Storage Report:');
          console.log(JSON.stringify(report, null, 2));
          process.exit(0);
        })
        .catch(error => {
          console.error('❌ Report generation failed:', error);
          process.exit(1);
        });
      break;
      
    case 'schedule':
      manager.scheduleCleanup();
      console.log('🕐 Cleanup scheduler is running. Press Ctrl+C to stop.');
      break;
      
    default:
      console.log(`
🧹 ErthaLoka File Cleanup Manager

Usage: node scripts/cleanup-files.js <command>

Commands:
  cleanup   - Run immediate cleanup
  report    - Generate storage usage report
  schedule  - Start cleanup scheduler (runs in background)

Examples:
  node scripts/cleanup-files.js cleanup
  node scripts/cleanup-files.js report
  node scripts/cleanup-files.js schedule
      `);
      process.exit(1);
  }
}

module.exports = FileCleanupManager;