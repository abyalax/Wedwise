import { Prisma } from '~/generated/prisma/client';
import { prisma } from '../prisma/client';

export async function featureSeeder() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "features"
    RESTART IDENTITY CASCADE;
  `);

  const features: Prisma.FeatureCreateManyInput[] = [
    { name: 'Countdown', code: 'F-COUNTDOWN', price: '10000', status: 'Active', description: 'Countdown on the digital invitation page' },
    { name: 'Audio Music', code: 'F-AUDIOMUSIC', price: '10000', status: 'Active', description: 'Background music for the digital invitation page' },
    {
      name: 'Gallery of Bride and Groom',
      code: 'F-GALLERY',
      price: '15000',
      status: 'Active',
      description: 'Gallery of bride and groom that guests can access on the digital invitation',
    },
    {
      name: 'Bride and Groom Story',
      code: 'F-STORY',
      price: '10000',
      status: 'Active',
      description: 'Story of the bride and groom to be read by guests on the digital invitation',
    },
    {
      name: 'RSVP',
      code: 'F-RSVP',
      price: '25000',
      status: 'Active',
      description: 'RSVP for the digital invitation, can be done through the website or via WhatsApp with a chatbot',
    },
    {
      name: 'WhatsApp Broadcast',
      code: 'F-WABROADCAST',
      price: '100000',
      status: 'Active',
      description: 'Broadcast WhatsApp to guests for reminder to guests of the invitation',
    },
    {
      name: 'Chatbot',
      code: 'F-CHATBOT',
      price: '250000',
      status: 'Active',
      description: 'Chatbot as customer service for guests of the invitation, can be integrated with WhatsApp',
    },
  ];

  await prisma.feature.createMany({
    data: features,
  });

  console.log('✅ Seeding features success');
}
