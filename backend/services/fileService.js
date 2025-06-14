// services/fileService.js
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

class FileService {
  constructor() {
    this.uploadPath = process.env.UPLOAD_PATH || './uploads';
    this.maxFileSize = parseInt(process.env.MAX_FILE_SIZE) || 10485760; // 10MB default
    this.ensureUploadDirectory();
  }

  // Ensure upload directory exists
  async ensureUploadDirectory() {
    try {
      await fs.ensureDir(this.uploadPath);
      await fs.ensureDir(path.join(this.uploadPath, 'images'));
      await fs.ensureDir(path.join(this.uploadPath, 'documents'));
      await fs.ensureDir(path.join(this.uploadPath, 'profiles'));
      console.log('✅ Upload directories created/verified');
    } catch (error) {
      console.error('❌ Error creating upload directories:', error);
    }
  }

  // Generate unique filename
  generateFileName(originalName) {
    const timestamp = Date.now();
    const random = crypto.randomBytes(8).toString('hex');
    const extension = path.extname(originalName);
    return `${timestamp}_${random}${extension}`;
  }

  // Configure multer storage
  getMulterConfig(subfolder = 'documents') {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const uploadDir = path.join(this.uploadPath, subfolder);
        cb(null, uploadDir);
      },
      filename: (req, file, cb) => {
        const fileName = this.generateFileName(file.originalname);
        cb(null, fileName);
      }
    });

    const fileFilter = (req, file, cb) => {
      // Check file type based on subfolder
      if (subfolder === 'images') {
        if (file.mimetype.startsWith('image/')) {
          cb(null, true);
        } else {
          cb(new Error('Only image files are allowed'), false);
        }
      } else if (subfolder === 'documents') {
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (allowedTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Only PDF and DOC files are allowed'), false);
        }
      } else {
        cb(null, true); // Allow all for general uploads
      }
    };

    return multer({
      storage,
      fileFilter,
      limits: {
        fileSize: this.maxFileSize
      }
    });
  }

  // Upload single image with optimization
  async uploadImage(file, options = {}) {
    try {
      const {
        width = 800,
        height = 600,
        quality = 80,
        format = 'jpeg'
      } = options;

      const fileName = this.generateFileName(file.originalname);
      const outputPath = path.join(this.uploadPath, 'images', fileName);

      // Optimize image using Sharp
      await sharp(file.buffer)
        .resize(width, height, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .jpeg({ quality })
        .toFile(outputPath);

      return {
        success: true,
        fileName,
        filePath: outputPath,
        url: `/uploads/images/${fileName}`,
        size: (await fs.stat(outputPath)).size
      };
    } catch (error) {
      console.error('Image upload error:', error);
      throw new Error('Failed to upload image');
    }
  }

  // Upload profile picture
  async uploadProfilePicture(file) {
    return this.uploadImage(file, {
      width: 400,
      height: 400,
      quality: 85,
      format: 'jpeg'
    });
  }

  // Upload document
  async uploadDocument(file) {
    try {
      const fileName = this.generateFileName(file.originalname);
      const outputPath = path.join(this.uploadPath, 'documents', fileName);

      await fs.writeFile(outputPath, file.buffer);

      return {
        success: true,
        fileName,
        filePath: outputPath,
        url: `/uploads/documents/${fileName}`,
        size: file.size,
        mimetype: file.mimetype
      };
    } catch (error) {
      console.error('Document upload error:', error);
      throw new Error('Failed to upload document');
    }
  }

  // Delete file
  async deleteFile(filePath) {
    try {
      const fullPath = path.join(this.uploadPath, filePath.replace('/uploads/', ''));
      await fs.remove(fullPath);
      return { success: true };
    } catch (error) {
      console.error('File deletion error:', error);
      throw new Error('Failed to delete file');
    }
  }

  // Get file info
  async getFileInfo(filePath) {
    try {
      const fullPath = path.join(this.uploadPath, filePath.replace('/uploads/', ''));
      const stats = await fs.stat(fullPath);
      
      return {
        exists: true,
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime
      };
    } catch (error) {
      return { exists: false };
    }
  }

  // Clean up old files (run as cron job)
  async cleanupOldFiles(daysOld = 30) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);

      const deletedFiles = [];
      
      const cleanDirectory = async (dir) => {
        const files = await fs.readdir(dir);
        
        for (const file of files) {
          const filePath = path.join(dir, file);
          const stats = await fs.stat(filePath);
          
          if (stats.isFile() && stats.mtime < cutoffDate) {
            await fs.remove(filePath);
            deletedFiles.push(filePath);
          }
        }
      };

      await cleanDirectory(path.join(this.uploadPath, 'images'));
      await cleanDirectory(path.join(this.uploadPath, 'documents'));

      console.log(`Cleaned up ${deletedFiles.length} old files`);
      return { deletedCount: deletedFiles.length, deletedFiles };
    } catch (error) {
      console.error('Cleanup error:', error);
      throw new Error('Failed to cleanup old files');
    }
  }

  // Get storage usage
  async getStorageUsage() {
    try {
      const getDirectorySize = async (dir) => {
        const files = await fs.readdir(dir);
        let totalSize = 0;
        
        for (const file of files) {
          const filePath = path.join(dir, file);
          const stats = await fs.stat(filePath);
          if (stats.isFile()) {
            totalSize += stats.size;
          }
        }
        return totalSize;
      };

      const imagesSize = await getDirectorySize(path.join(this.uploadPath, 'images'));
      const documentsSize = await getDirectorySize(path.join(this.uploadPath, 'documents'));
      const profilesSize = await getDirectorySize(path.join(this.uploadPath, 'profiles'));

      const totalSize = imagesSize + documentsSize + profilesSize;

      return {
        totalSize,
        totalSizeMB: Math.round(totalSize / (1024 * 1024) * 100) / 100,
        breakdown: {
          images: { size: imagesSize, sizeMB: Math.round(imagesSize / (1024 * 1024) * 100) / 100 },
          documents: { size: documentsSize, sizeMB: Math.round(documentsSize / (1024 * 1024) * 100) / 100 },
          profiles: { size: profilesSize, sizeMB: Math.round(profilesSize / (1024 * 1024) * 100) / 100 }
        }
      };
    } catch (error) {
      console.error('Storage usage calculation error:', error);
      return { totalSize: 0, totalSizeMB: 0, breakdown: {} };
    }
  }

  // Express middleware for serving uploaded files
  static serveUploads() {
    const express = require('express');
    const uploadPath = process.env.UPLOAD_PATH || './uploads';
    return express.static(uploadPath);
  }
}

module.exports = new FileService();