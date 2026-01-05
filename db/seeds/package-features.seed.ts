import { Prisma } from '~/generated/prisma/client';
import { prisma } from '../prisma/client';

export async function packageFeatureSeeder() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "package_features"
    RESTART IDENTITY CASCADE;
  `);

  const packageFeature: Prisma.PackageFeatureCreateManyInput[] = [
    {
      packageId: 1,
      featureId: 1,
    },
  ];

  await prisma.packageFeature.createMany({
    data: packageFeature,
  });

  console.log('✅ Seeding package features success');
}
