import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';
import { getQueryClient } from '~/lib/query/client';
import { queryGetCustomer } from '../../_hooks/use-get-customer';
import { Component } from './_components';

export const permissions = [PERMISSIONS.CUSTOMER.UPDATE_INVITATION];

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
    active: false,
  },
  {
    title: 'Update Customer',
    url: `/backoffice/customers/${customerId}/update`,
    active: true,
  },
];

type Props = PageProps<'/backoffice/customers/[customerId]/update'>;

export default async function Page({ params }: Props) {
  const queryClient = getQueryClient();
  const { customerId } = await params;
  const breadcrumbs = breadcrumbItems(customerId);

  void queryClient.prefetchQuery(queryGetCustomer(customerId));

  return (
    <PageScreen title="Update Guest" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
