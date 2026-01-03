import { Metadata } from 'next';

import { PageScreen } from '~/components/layouts/page';
import { Component } from './_components';

export const metadata: Metadata = {
  title: 'Create client | Admin Dashboard',
  description: 'Add a new client and assign roles & permissions in the system.',
  keywords: ['create client', 'admin', 'dashboard', 'roles', 'permissions'],
  openGraph: {
    title: 'Create client - Admin Dashboard',
    description: 'Add a new client and assign roles & permissions in the system.',
    type: 'website',
    url: '/admin/client/create',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Create Client Page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Client - Admin Dashboard',
    description: 'Add a new client and assign roles & permissions in the system.',
    images: ['/og-image.png'],
  },
};

const breadcrumbItems = (customerId: string) => [
  {
    title: 'Dashboard',
    url: `/${customerId}`,
    active: false,
  },
  {
    title: 'Guests',
    url: `/${customerId}/guests`,
    active: false,
  },
  {
    title: 'Create Guests',
    url: `/${customerId}/guests/create`,
    active: true,
  },
];

type Props = PageProps<'/[customerId]/guests/create'>;

export default async function Page({ params }: Props) {
  const { customerId } = await params;
  const breadcrumbs = breadcrumbItems(customerId);

  return (
    <PageScreen title="Create Guest" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
