/**
 * AI Agent Service - Main Entry Point
 * Background service for autonomous task suggestions
 * Phase 4: Cloud-Native Kubernetes Deployment
 */

import { logger } from './config/logger.config';
import { initializeScheduler, shutdownScheduler } from './scheduler';
import { getDatabaseStatus } from './config/database.config';

const SERVICE_NAME = 'ai-agent';
const SHUTDOWN_TIMEOUT = 30000; // 30 seconds

let isShuttingDown = false;

/**
 * Main entry point
 */
async function main(): Promise<void> {
  logger.info({ service: SERVICE_NAME }, 'Starting AI Agent service');

  try {
    // Check database connectivity
    const dbStatus = await getDatabaseStatus();
    if (!dbStatus.connected) {
      logger.error({ error: dbStatus.error }, 'Database connection failed');
      process.exit(1);
    }

    logger.info('Database connection established');

    // Initialize scheduler
    await initializeScheduler();
    logger.info('Scheduler initialized');

    logger.info({ service: SERVICE_NAME }, 'AI Agent service started successfully');
  } catch (error) {
    logger.error({ error }, 'Failed to start AI Agent service');
    process.exit(1);
  }
}

/**
 * Graceful shutdown handler
 */
async function shutdown(signal: string): Promise<void> {
  if (isShuttingDown) {
    logger.warn('Shutdown already in progress');
    return;
  }

  isShuttingDown = true;
  logger.info({ signal }, 'Received shutdown signal, starting graceful shutdown');

  const shutdownTimeout = setTimeout(() => {
    logger.error('Shutdown timeout exceeded, forcing exit');
    process.exit(1);
  }, SHUTDOWN_TIMEOUT);

  try {
    // Stop scheduler
    await shutdownScheduler();
    logger.info('Scheduler stopped');

    clearTimeout(shutdownTimeout);
    logger.info('Graceful shutdown completed');
    process.exit(0);
  } catch (error) {
    logger.error({ error }, 'Error during shutdown');
    clearTimeout(shutdownTimeout);
    process.exit(1);
  }
}

// Register signal handlers
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error({ error }, 'Uncaught exception');
  shutdown('uncaughtException');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error({ reason, promise }, 'Unhandled promise rejection');
});

// Start the service
main().catch((error) => {
  logger.error({ error }, 'Fatal error in main');
  process.exit(1);
});
