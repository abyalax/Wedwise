import { Metadata } from 'next';
import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';
import { Component } from './_components';

export const metadata: Metadata = {
  title: 'Customer Management | Dashboard',
  description: 'Manage accounts, roles, and permissions in the admin dashboard',
  keywords: 'management, admin, roles, permissions',
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
    active: false,
  },
  {
    title: 'Customers',
    url: '/backoffice/customers',
    active: true,
  },
];

export default async function Page() {
  return (
    <PageScreen title="Customers" breadcrumbs={breadcrumbItems}>
      <Component />
    </PageScreen>
  );
}
