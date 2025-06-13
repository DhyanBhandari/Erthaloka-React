// backend/healthcheck.js
const http = require('http');
const pool = require('./config/database');

const HEALTH_CHECK_PORT = process.env.PORT || 5000;
const HEALTH_CHECK_HOST = process.env.HOST || 'localhost';
const HEALTH_CHECK_TIMEOUT = 5000; // 5 seconds timeout

// Health check function
const performHealthCheck = async () => {
  const healthStatus = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: {}
  };

  try {
    // Check database connection
    try {
      const dbResult = await pool.query('SELECT 1 as health_check');
      healthStatus.services.database = dbResult.rows.length > 0 ? 'healthy' : 'unhealthy';
    } catch (dbError) {
      console.error('Database health check failed:', dbError.message);
      healthStatus.services.database = 'unhealthy';
      healthStatus.status = 'DEGRADED';
    }

    // Check memory usage
    const memUsage = process.memoryUsage();
    const memUsageMB = {
      rss: Math.round(memUsage.rss / 1024 / 1024),
      heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
      heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
      external: Math.round(memUsage.external / 1024 / 1024)
    };

    healthStatus.memory = memUsageMB;

    // Check if memory usage is too high (>90% of heap)
    const heapUsagePercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;
    if (heapUsagePercent > 90) {
      healthStatus.services.memory = 'unhealthy';
      healthStatus.status = 'DEGRADED';
    } else {
      healthStatus.services.memory = 'healthy';
    }

    // Check disk space (basic check)
    try {
      const fs = require('fs');
      const stats = fs.statSync('./');
      healthStatus.services.filesystem = 'healthy';
    } catch (fsError) {
      healthStatus.services.filesystem = 'unhealthy';
      healthStatus.status = 'DEGRADED';
    }

    // Overall health status
    const unhealthyServices = Object.values(healthStatus.services).filter(status => status === 'unhealthy');
    if (unhealthyServices.length > 0) {
      healthStatus.status = unhealthyServices.length === Object.keys(healthStatus.services).length ? 'CRITICAL' : 'DEGRADED';
    }

    return healthStatus;

  } catch (error) {
    console.error('Health check error:', error);
    return {
      status: 'CRITICAL',
      timestamp: new Date().toISOString(),
      error: error.message,
      services: {
        application: 'unhealthy'
      }
    };
  }
};

// HTTP health check endpoint
const startHealthCheckServer = () => {
  const server = http.createServer(async (req, res) => {
    if (req.url === '/health' && req.method === 'GET') {
      try {
        const healthStatus = await performHealthCheck();
        
        // Set appropriate HTTP status code
        let statusCode = 200;
        if (healthStatus.status === 'DEGRADED') {
          statusCode = 200; // Still operational but with issues
        } else if (healthStatus.status === 'CRITICAL') {
          statusCode = 503; // Service unavailable
        }

        res.writeHead(statusCode, { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify(healthStatus, null, 2));

      } catch (error) {
        console.error('Health check endpoint error:', error);
        res.writeHead(503, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          status: 'CRITICAL',
          timestamp: new Date().toISOString(),
          error: 'Health check failed'
        }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });

  server.listen(HEALTH_CHECK_PORT, HEALTH_CHECK_HOST, () => {
    console.log(`Health check server running on http://${HEALTH_CHECK_HOST}:${HEALTH_CHECK_PORT}/health`);
  });

  return server;
};

// Command line health check (for Docker)
const cliHealthCheck = async () => {
  try {
    const healthStatus = await performHealthCheck();
    
    console.log(JSON.stringify(healthStatus, null, 2));
    
    // Exit with appropriate code
    if (healthStatus.status === 'CRITICAL') {
      process.exit(1);
    } else if (healthStatus.status === 'DEGRADED') {
      process.exit(0); // Still exit 0 for degraded state to avoid container restart
    } else {
      process.exit(0);
    }

  } catch (error) {
    console.error('CLI Health check failed:', error);
    process.exit(1);
  }
};

// Graceful shutdown
const gracefulShutdown = (server) => {
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down health check server gracefully');
    server.close(() => {
      console.log('Health check server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down health check server gracefully');
    server.close(() => {
      console.log('Health check server closed');
      process.exit(0);
    });
  });
};

// Enhanced health check with external services
const extendedHealthCheck = async () => {
  const healthStatus = await performHealthCheck();

  try {
    // Check external API dependencies (if any)
    const externalChecks = [];

    // Check Razorpay API health (optional)
    if (process.env.RAZORPAY_KEY_ID) {
      try {
        const https = require('https');
        const checkRazorpay = new Promise((resolve, reject) => {
          const req = https.get('https://api.razorpay.com/v1/', (res) => {
            resolve(res.statusCode === 200 || res.statusCode === 401); // 401 is expected without auth
          });
          req.on('error', reject);
          req.setTimeout(3000, () => reject(new Error('Timeout')));
        });
        
        const razorpayHealthy = await checkRazorpay;
        healthStatus.services.razorpay = razorpayHealthy ? 'healthy' : 'unhealthy';
      } catch (error) {
        healthStatus.services.razorpay = 'unhealthy';
      }
    }

    // Check SMTP server health (if configured)
    if (process.env.SMTP_HOST) {
      try {
        const net = require('net');
        const checkSMTP = new Promise((resolve, reject) => {
          const socket = net.createConnection(process.env.SMTP_PORT || 587, process.env.SMTP_HOST);
          socket.on('connect', () => {
            socket.destroy();
            resolve(true);
          });
          socket.on('error', reject);
          socket.setTimeout(3000, () => reject(new Error('Timeout')));
        });

        await checkSMTP;
        healthStatus.services.smtp = 'healthy';
      } catch (error) {
        healthStatus.services.smtp = 'unhealthy';
      }
    }

  } catch (error) {
    console.error('Extended health check error:', error);
  }

  return healthStatus;
};

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--cli')) {
    // Command line mode (for Docker health checks)
    cliHealthCheck();
  } else if (args.includes('--extended')) {
    // Extended health check mode
    extendedHealthCheck().then(healthStatus => {
      console.log(JSON.stringify(healthStatus, null, 2));
      process.exit(healthStatus.status === 'CRITICAL' ? 1 : 0);
    });
  } else {
    // Server mode (default)
    const server = startHealthCheckServer();
    gracefulShutdown(server);
  }
}

module.exports = {
  performHealthCheck,
  extendedHealthCheck,
  startHealthCheckServer
};