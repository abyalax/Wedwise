import { Prisma } from '~/generated/prisma/client';
import { prisma } from '../prisma/client';

export async function agentSeeder() {
  await prisma.$executeRawUnsafe(`
        TRUNCATE TABLE "agents"
        RESTART IDENTITY CASCADE;
      `);

  const agents: Prisma.AgentCreateManyInput[] = [
    {
      name: 'General Agent',
      context:
        'You are a helpful AI assistant for digital wedding invitations. Provide information, answer questions, and assist with any inquiries related to digital weddings.',
      provider: 'Google',
      systemPrompt: 'You are a digital wedding invitation expert. Be informative, friendly, and helpful in your responses.',
      model: 'gemini-2.5-flash',
      apiKey: '',
    },
  ];

  await prisma.agent.createMany({
    data: agents,
  });
  console.log('✅ Seeding agents success');
}
