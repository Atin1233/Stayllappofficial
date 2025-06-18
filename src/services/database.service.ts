import { PrismaClient } from '@prisma/client';

/**
 * Database service for Stayll
 * 
 * This service provides a centralized way to access the Prisma client
 * and handle database connections throughout the application.
 */

// Create a single instance of PrismaClient
const prisma = new PrismaClient();

// Handle graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

// Handle uncaught exceptions
process.on('uncaughtException', async (error) => {
  console.error('Uncaught Exception:', error);
  await prisma.$disconnect();
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', async (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  await prisma.$disconnect();
  process.exit(1);
});

export { prisma };

/**
 * Database health check
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    // For SQLite, we'll just try to query a simple table
    await prisma.user.findFirst();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

/**
 * Initialize database (create tables if they don't exist)
 */
export async function initializeDatabase(): Promise<void> {
  try {
    // For SQLite, the tables are already created by Prisma migrations
    // We just need to verify the connection works
    await prisma.user.findFirst();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
} 