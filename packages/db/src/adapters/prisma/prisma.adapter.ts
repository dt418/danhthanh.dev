/**
 * Prisma Database Adapter
 * Implements IDatabaseAdapter for Prisma ORM
 */

import { createPrismaClient } from './prisma.client';

import type { IDatabaseAdapter } from '../interfaces/database.interface';
import type { PrismaClient } from '@prisma/client';

export class PrismaAdapter implements IDatabaseAdapter {
  private client: PrismaClient;

  private connected = false;

  constructor() {
    this.client = createPrismaClient();
  }

  /**
   * Connect to the database
   */
  async connect(): Promise<void> {
    if (this.connected) {
      return;
    }

    try {
      await this.client.$connect();
      this.connected = true;
    } catch (error) {
      console.error('Failed to connect to database:', error);
      throw error;
    }
  }

  /**
   * Disconnect from the database
   */
  async disconnect(): Promise<void> {
    if (!this.connected) {
      return;
    }

    try {
      await this.client.$disconnect();
      this.connected = false;
    } catch (error) {
      console.error('Failed to disconnect from database:', error);
      throw error;
    }
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.connected;
  }

  /**
   * Get the underlying Prisma client instance
   */
  getClient<T>(): T {
    return this.client as T;
  }
}
