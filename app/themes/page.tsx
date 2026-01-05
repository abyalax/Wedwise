import { Metadata } from 'next';

import { PageThemes } from './_components/page-themes';

export const metadata: Metadata = {
  title: 'Order | Wedwise',
  description: 'Welcome to your personalized dashboard. Access all your important information and features.',
  keywords: 'Order, dashboard, home, overview, user panel',
};

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return <PageThemes />;
}
