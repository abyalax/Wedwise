import { prisma } from '~/db/prisma/client';
import { Prisma } from '~/generated/prisma/client';

export async function invitationSeeder() {
  // --- RESET DATA ---
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "invitations"
    RESTART IDENTITY CASCADE;
  `);

  const contents = {
    location: {
      name: 'Gedung Serbaguna XYZ',
      address: 'Jl. Mawar No. 10, Jakarta',
      mapUrl: 'https://maps.google.com/...',
    },
    audio: {
      enabled: true,
      url: '/music/akad.mp3',
      loop: true,
    },
    stories: [
      {
        title: 'Pertemuan Pertama',
        date: '2019-03-12',
        content: 'Kami bertemu di kampus...',
      },
      {
        title: 'Lamaran',
        date: '2023-06-01',
        content: 'Momen spesial...',
      },
    ],

    events: {
      akad: {
        date: '2024-08-10T08:00:00Z',
        note: 'Akad nikah tertutup',
      },
      resepsi: {
        date: '2024-08-10T11:00:00Z',
        note: 'Resepsi terbuka',
      },
    },

    galleries: ['/img/1.jpg', '/img/2.jpg'],

    rekening: [
      {
        bank: 'BCA',
        name: 'Ahmad',
        number: '1234567890',
      },
    ],
  };

  const invitationsData: Prisma.InvitationCreateManyInput[] = [
    {
      orderId: 1,
      aiContext: 'pernikahan kami memakai tema classic, sarankan pada tamu agar menggunakan pakaian putih agar match dengan tema kami',
      brideName: 'Selvy Rirantri',
      groomName: 'Putra Cipto Mangunkusumo',
      themeCode: 'T-CLASSIC',
      contents,
    },
  ];

  await prisma.invitation.createMany({
    data: invitationsData,
  });

  console.log('✅ Seeding invitations success');
}
