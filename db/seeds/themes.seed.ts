import { Prisma } from '~/generated/prisma/client';
import { prisma } from '../prisma/client';

export async function themeSeeder() {
  // --- RESET DATA ---
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "themes", "theme_categories"
    RESTART IDENTITY CASCADE;
  `);

  const themeCategories: Prisma.ThemeCategoryCreateManyInput[] = [
    { id: 1, name: 'Classic' },
    { id: 2, name: 'Rustic' },
    { id: 3, name: 'Elegant' },
    { id: 4, name: 'Modern' },
    { id: 5, name: 'Romantic' },
    { id: 6, name: 'Tropical' },
    { id: 7, name: 'Minimalist' },
  ];

  const themes: Prisma.ThemeCreateManyInput[] = [
    {
      categoryId: 1,
      name: 'Classic',
      image: 'https://abyalax.github.io/wedding-templates/classic/',
      slug: 'classic',
      status: 'Active',
      code: 'T-CLASSIC',
    },
  ];

  await prisma.themeCategory.createMany({
    data: themeCategories,
  });

  await prisma.theme.createMany({
    data: themes,
  });

  console.log('✅ Seeding themes success');
}
