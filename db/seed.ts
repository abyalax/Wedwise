import { config } from 'dotenv';
import {
  agentSeeder,
  conversationSeeder,
  featureSeeder,
  guestSeeder,
  invitationSeeder,
  orderSeeder,
  packageFeatureSeeder,
  packageSeeder,
  paymentSeeder,
  themeSeeder,
  userSeeder,
} from './seeds';

config();

async function main() {
  console.log('⚡ Seeding deterministic data...');
  await userSeeder(); // users
  await agentSeeder(); // agents

  await themeSeeder(); // themes (and category if embedded)
  await featureSeeder(); // features
  await packageSeeder(); // packages
  await packageFeatureSeeder(); // package_features (pivot)

  await orderSeeder(); // orders (needs user/customer, theme, package snapshot)
  await invitationSeeder(); // invitations (needs order)
  await guestSeeder(); // guests (needs invitation)
  await conversationSeeder(); // conversations (needs guest)

  await paymentSeeder(); // payments (needs order)
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
