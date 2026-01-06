import { Prisma, RSVPStatus } from '~/generated/prisma/client';
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
      email: 'budi@example.com',
      rsvpStatus: RSVPStatus.ATTENDED,
      notes: 'Akan datang bersama istri',
    },
    {
      invitationId: 1,
      name: 'Siti Aminah',
      phone: '087765290291',
      participant: 2,
      email: 'sitiaminah@mail.com',
      rsvpStatus: RSVPStatus.ATTENDED,
    },
    {
      invitationId: 1,
      name: 'Dewi Lestari',
      phone: '087765290291',
      participant: 2,
      email: 'dewilestari@mail.com',
      rsvpStatus: RSVPStatus.NOTAVAILABLE,
      reason: 'Ada keluarga meninggal',
    },
    {
      invitationId: 1,
      name: 'Budi Setia',
      phone: '087765432109',
      participant: 3,
      email: 'budisetia@mail.com',
      rsvpStatus: RSVPStatus.CONFIRMED,
    },
    {
      invitationId: 1,
      name: 'Rini Anggraeni',
      phone: '087765432109',
      participant: 3,
      email: 'rinianggraeni@mail.com',
      rsvpStatus: RSVPStatus.PENDING,
    },
    {
      invitationId: 1,
      name: 'Siti Rohmah',
      phone: '087765432109',
      participant: 4,
      email: 'sitrohmah@mail.com',
      rsvpStatus: RSVPStatus.ATTENDED,
    },
    {
      invitationId: 1,
      name: 'Dian Surya',
      phone: '087765432109',
      participant: 4,
      email: 'diansurya@mail.com',
      rsvpStatus: RSVPStatus.NOTAVAILABLE,
      reason: 'Sakit Tenggorokan',
    },
    {
      invitationId: 1,
      name: 'Feri Purnama',
      phone: '087765432109',
      participant: 5,
      email: 'feripurnama@mail.com',
      rsvpStatus: RSVPStatus.CONFIRMED,
    },
  ];

  for (const guest of guests) {
    await prisma.guest.create({ data: guest });
  }

  console.log('✅ Seeding guest success');
}
