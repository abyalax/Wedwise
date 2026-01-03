import { Metadata } from 'next';

import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Next Boilerplate',
  description: 'Administrative dashboard for managing users, settings, and system configurations',
  keywords: 'admin, dashboard, management, users, settings',
};

export const permissions = [PERMISSIONS.ADMIN.MANAGE_CUSTOMERS];

const breadcrumbItems = [
  {
    title: 'Home',
    url: '/',
    active: false,
  },
  {
    title: 'Dashboard',
    url: '/backoffice',
    active: true,
  },
  {
    title: 'Customers',
    url: '/backoffice/customers',
    active: false,
  },
];

export default function Page() {
  return <PageScreen title="Dashboard" breadcrumbs={breadcrumbItems} />;
}
