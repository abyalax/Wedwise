import { conversationSeeder, invitationSeeder, userSeeder } from './seeds';

async function main() {
  console.log('⚡ Seeding deterministic data...');
  await userSeeder();
  await conversationSeeder();
  await invitationSeeder();
}

main()
  .then(async () => {
    console.log('✅ Seed data successfully created');
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
