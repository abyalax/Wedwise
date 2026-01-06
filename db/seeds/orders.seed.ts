import { OrderStatus, Prisma, StatusActivation } from '~/generated/prisma/client';
import { prisma } from '../prisma/client';

export async function orderSeeder() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "orders"
    RESTART IDENTITY CASCADE;
  `);

  const themeSnapshot: Prisma.ThemeCreateManyInput = {
    slug: 'classic',
    name: 'Classic',
    image: 'https://abyalax.github.io/wedding-templates/classic/',
    status: StatusActivation.ACTIVE,
    code: 'T-CLASSIC',
    categoryId: 1,
  };

  const packageSnapshot: Prisma.PackageCreateManyInput = {
    code: 'P-BASIC',
    name: 'Package Basic',
    price: '125000',
    status: StatusActivation.ACTIVE,
  };

  const orders: Prisma.OrderCreateManyInput[] = [
    {
      status: OrderStatus.DRAFT,
      totalPrice: '',
      themeSnapshot: themeSnapshot,
      packageSnapshot: packageSnapshot,
    },
  ];

  await prisma.order.createMany({
    data: orders,
  });

  console.log('✅ Seeding orders success');
}
