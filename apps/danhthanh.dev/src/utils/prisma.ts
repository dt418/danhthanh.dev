import dotenv from 'dotenv';

import { PrismaClient } from '../../generated/prisma/client';

dotenv.config();


interface Global {
  prisma?: PrismaClient;
}

const globalForPrisma = global as unknown as Global;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
