import { Prisma } from '~/generated/prisma/client';
import { prisma } from '../prisma/client';

export async function guestSeeder() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "guests"
    RESTART IDENTITY CASCADE;
  `);

  const guests: Prisma.GuestCreateManyInput[] = [
    {
      invitationId: 1,
      name: 'Budi Santoso',
      phone: '087765290292',
      participant: 3,
    },
    {
      invitationId: 1,
      name: 'Siti Aminah',
      phone: '087765290291',
      participant: 2,
    },
  ];

  await prisma.guest.createMany({
    data: guests,
  });

  console.log('✅ Seeding guest success');
}
