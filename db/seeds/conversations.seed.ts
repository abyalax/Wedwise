import { prisma } from '~/db/prisma/client';

export async function conversationSeeder() {
  // --- RESET DATA ---
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "conversations"
    RESTART IDENTITY CASCADE;
  `);

  // timestamp awal
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

  // --- INSERT CONVERSATION ---
  await prisma.conversation.create({
    data: {
      guest_id: 1,
      last_interaction: new Date(),
      messages: mockMessages, // ⬅️ JSON native
    },
  });

  console.log('✅ Seeding conversations done!');
}
