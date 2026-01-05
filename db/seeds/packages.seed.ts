import { Prisma } from '~/generated/prisma/client';
import { prisma } from '../prisma/client';

export async function packageSeeder() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "packages"
    RESTART IDENTITY CASCADE;
  `);

  const packages: Prisma.PackageCreateManyInput[] = [
    {
      code: 'P-BASIC',
      name: 'Package Basic',
      price: '100000',
      status: 'Active',
    },
    {
      code: 'P-PREMIUM',
      name: 'Package Premium',
      price: '175000',
      status: 'Active',
    },
    {
      code: 'P-GOLD',
      name: 'Package Gold',
      price: '200000',
      status: 'Active',
    },
    {
      code: 'P-PLATINUM',
      name: 'Package Platinum',
      price: '275000',
      status: 'Active',
    },
    {
      code: 'P-DIAMOND',
      name: 'Package Diamond',
      price: '350000',
      status: 'Active',
    },
  ];

  await prisma.package.createMany({
    data: packages,
  });

  console.log('✅ Seeding packages success');
}
