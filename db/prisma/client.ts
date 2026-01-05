import { PrismaPg } from '@prisma/adapter-pg';
import { pagination } from 'prisma-extension-pagination';
import { PrismaClient } from '~/generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export const prismaList = prisma.$extends(
  pagination({
    pages: {
      includePageCount: true,
    },
  }),
);
