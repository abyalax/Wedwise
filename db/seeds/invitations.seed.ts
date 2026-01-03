import { prisma } from '~/db/prisma/client';
import { Prisma } from '~/generated/prisma/client';

export async function invitationSeeder() {
  // --- RESET DATA ---
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "features",
      "invitation_features",
      "invitations"
    RESTART IDENTITY CASCADE;
  `);

  // --- FEATURES ---
  const featuresData: Prisma.FeatureCreateManyInput[] = [
    { name: 'Countdown', description: 'Hitung mundur di halaman digital invitation' },
    { name: 'Audio Music', description: 'Background music untuk halaman digital invitation' },
    { name: 'Galery Pengantin', description: 'Gallery pengantin yang dapat diakses oleh tamu di undangan digital' },
    { name: 'Story Pengantin', description: 'Kisah perjalanan pengantin untuk dibaca oleh tamu di undangan digital' },
    { name: 'RSVP', description: 'RSVP untuk undangan digital, bisa melalui website atau melalui whatsapp dengan chatbot' },
    { name: 'Whatsapp Broadcast', description: 'Broadcast whatsapp kepada tamu undangan untuk reminder kepada tamu undangan' },
    { name: 'Chatbot', description: 'Chatbot sebagai customer service untuk kebutuhan tamu undangan, dapat di integrasikan ke whatsapp' },
  ];

  await prisma.feature.createMany({
    data: featuresData,
  });

  const features = await prisma.feature.findMany({
    select: { id: true, name: true },
  });

  // --- INVITATIONS ---
  const invitationsData = [
    {
      customer_id: 1,
      wedding_date: new Date('2025-12-13'),
      theme: 'classic',
      name: 'Wedding Invitation',
      ai_context: 'pernikahan kami memakai tema classic, sarankan pada tamu agar menggunakan pakaian putih agar match dengan tema kami',
    },
  ];

  await prisma.invitation.createMany({
    data: invitationsData,
  });

  const invitations = await prisma.invitation.findMany({
    select: { id: true, name: true },
  });

  // --- INVITATION FEATURES (M2M) ---
  const invitationFeaturesData = [];

  for (const invitation of invitations) {
    for (const feature of features) {
      invitationFeaturesData.push({
        invitation_id: invitation.id,
        feature_id: feature.id,
        is_enabled: true,
      });
    }
  }

  if (invitationFeaturesData.length > 0) {
    await prisma.invitationFeature.createMany({
      data: invitationFeaturesData,
    });
  }

  console.log('✅ Seeding features, invitations, and invitation_features relations done!');
}
