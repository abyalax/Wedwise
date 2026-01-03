import { Metadata } from 'next';
import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';
import { Component } from './_components';

export const metadata: Metadata = {
  title: 'Create Customer | Admin Dashboard',
  description: 'Add a new Customer and assign roles & permissions in the system.',
  keywords: ['create Customer', 'admin', 'dashboard', 'roles', 'permissions'],
  openGraph: {
    title: 'Create Customer - Admin Dashboard',
    description: 'Add a new Customer and assign roles & permissions in the system.',
    type: 'website',
    url: '/admin/Customer/create',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Create Customer Page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Customer - Admin Dashboard',
    description: 'Add a new Customer and assign roles & permissions in the system.',
    images: ['/og-image.png'],
  },
};

const breadcrumbItems = [
  {
    title: 'Home',
    url: '/',
    active: false,
  },
  {
    title: 'Dashboard',
    url: '/backoffice',
    active: false,
  },
  {
    title: 'Customers',
    url: '/backoffice/customers',
    active: false,
  },
  {
    title: 'Create Customer',
    url: '/backoffice/customers/create',
    active: true,
  },
];

// todo: create new permisison explisit to create customers
export const permissions = [PERMISSIONS.CUSTOMER.MANAGE_CUSTOMERS];

export default function Page() {
  return (
    <PageScreen title="Create Customer" breadcrumbs={breadcrumbItems}>
      <Component />
    </PageScreen>
  );
}
