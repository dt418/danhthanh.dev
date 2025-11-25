/**
 * Prisma Client Factory
 * Manages Prisma client instantiation with global singleton pattern for development
 */

/* eslint-disable import/no-extraneous-dependencies */
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'node:path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

interface GlobalForPrisma {
  prisma?: PrismaClient;
}

const globalForPrisma = global as unknown as GlobalForPrisma;

/**
 * Create or get existing Prisma client instance
 * In development, the client is cached globally to prevent connection exhaustion
 */
export function createPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = client;
  }

  return client;
}

/**
 * Get the global Prisma client instance
 */
export const prisma = createPrismaClient();

/**
 * Export Prisma client type
 */
export type { PrismaClient };
