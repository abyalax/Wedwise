import { prisma } from './prisma/client';

await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "guests"
    RESTART IDENTITY CASCADE;
  `);
