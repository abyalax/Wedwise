import { prisma } from './prisma/client';

await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "themes"
    RESTART IDENTITY CASCADE;
  `);
