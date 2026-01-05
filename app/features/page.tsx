import { Metadata } from 'next';
import { FeaturesPage } from './_components/feature-page';

export const metadata: Metadata = {
  title: 'Pricing | Wedwise',
  description: 'Welcome to your personalized dashboard. Access all your important information and features.',
  keywords: 'pricing, dashboard, home, overview, user panel',
};

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return <FeaturesPage />;
}
