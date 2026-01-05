import { prisma } from '~/db/prisma/client';

export async function conversationSeeder() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "conversations"
    RESTART IDENTITY CASCADE;
  `);

  const now = new Date();

  const mockMessages = [
    {
      role: 'user',
      content: 'Hallo ada apa saja nanti di acara pernikahan ?',
      timestamp: now.toISOString(),
    },
    {
      role: 'assistant',
      content:
        'Pada acara pernikahan, kami memiliki berbagai vendor yang memberikan layanan terbaik, seperti Music Studio, Event Organizer, Aest Decoration, MUA, Lila Catering (menu makanan) dll. Kita dapat mengkonfirmasi kehadiran lewat RSVP.',
      timestamp: new Date(now.getTime() + 3000).toISOString(), // +3 detik
    },
  ];

  await prisma.conversation.create({
    data: {
      guestId: 1,
      messages: mockMessages,
    },
  });

  console.log('✅ Seeding conversations success');
}
