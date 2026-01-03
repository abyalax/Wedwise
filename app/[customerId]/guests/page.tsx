import { Metadata } from 'next';

import { PERMISSIONS } from '~/common/const/permission';
import { MetaRequest } from '~/common/types/meta';
import { PageScreen } from '~/components/layouts/page';
import type { Guest } from '~/db/schema.d';
import { getQueryClient } from '~/lib/query/client';
import { Component } from './_components';
import { queryGetGuests } from './_hooks/use-get-guests';

export const metadata: Metadata = {
  title: 'Guests Management | Dashboard',
  description: 'Manage guest accounts, roles, and permissions in the admin dashboard',
  keywords: 'guests, management, admin, roles, permissions',
};

export const permissions = [PERMISSIONS.CUSTOMER.READ_INVITATION, PERMISSIONS.CUSTOMER.DELETE_INVITATION];
const breadcrumbItems = (customerId: string) => [
  {
    title: 'Dashboard',
    url: `/${customerId}`,
    active: false,
  },
  {
    title: 'Guests',
    url: `/${customerId}/guests`,
    active: true,
  },
];

type Props = PageProps<'/[customerId]/guests'>;

export default async function Page({ params, searchParams }: Props) {
  const querySearch = await searchParams;

  const query: MetaRequest<Guest> = {
    page: querySearch.page ? Number(querySearch.page) : 1,
    per_page: querySearch.per_page ? Number(querySearch.per_page) : 10,
    search: querySearch.search as string,
    sort_by: querySearch.sort_by as keyof Guest,
    sort_order: querySearch.order_by as 'ASC' | 'DESC',
  };

  const { customerId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(queryGetGuests(customerId, query));
  const breadcrumbs = breadcrumbItems(customerId);

  return (
    <PageScreen title="Dashboard" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
