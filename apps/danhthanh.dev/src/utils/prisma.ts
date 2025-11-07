/* eslint-disable import/no-extraneous-dependencies */
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

interface Global {
  prisma?: PrismaClient;
}

const globalForPrisma = global as unknown as Global;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
