import dotenv from 'dotenv';

dotenv.config();

import { PrismaClient } from '../../generated/prisma/client';

interface Global {
  prisma?: PrismaClient;
}

const globalForPrisma = global as unknown as Global;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Add error handling
prisma.$connect().catch((error) => {
  console.error('Failed to connect to the database:', error);
});
