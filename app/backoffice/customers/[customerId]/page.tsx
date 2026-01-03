import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';
import { Component } from './_components';

export const permissions = [PERMISSIONS.ADMIN.MANAGE_CUSTOMERS];

const breadcrumbItems = (customerId: string) => [
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
    title: 'Customer Detail',
    url: `/backoffice/customers/${customerId}`,
    active: true,
  },
];

type Props = PageProps<'/backoffice/customers/[customerId]'>;

export default async function Page({ params }: Props) {
  const { customerId } = await params;
  const breadcrumbs = breadcrumbItems(customerId);
  return (
    <PageScreen title="Customer Detail" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
