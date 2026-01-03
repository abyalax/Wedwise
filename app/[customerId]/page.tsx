import { Metadata } from 'next';

import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';

export const metadata: Metadata = {
  title: 'Customer Dashboard | Next Boilerplate',
  description: 'Customer dashboard for managing users, settings, and system configurations',
  keywords: 'Customer, dashboard, management, users, settings',
};

export const permissions = [PERMISSIONS.CUSTOMER.READ_INVITATION, PERMISSIONS.CUSTOMER.CREATE_INVITATION];

const breadcrumbItems = (customerId: string) => [
  {
    title: 'Dashboard',
    url: `/${customerId}`,
    active: true,
  },
  {
    title: 'Guests',
    url: `/${customerId}/guests`,
    active: false,
  },
];

type Props = PageProps<'/[customerId]'>;

export default async function Page({ params }: Props) {
  const { customerId } = await params;
  const breadcrumbs = breadcrumbItems(customerId);

  return <PageScreen title="Dashboard" breadcrumbs={breadcrumbs} />;
}
