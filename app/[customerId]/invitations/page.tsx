import { Metadata } from 'next';

import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';
import { Component } from './_components';

export const metadata: Metadata = {
  title: 'Invitation Management | Dashboard',
  description: 'Manage invitations in the admin dashboard',
  keywords: 'invitations, management, admin, roles, permissions',
};

export const permissions = [PERMISSIONS.CUSTOMER.READ_INVITATION, PERMISSIONS.CUSTOMER.DELETE_INVITATION];
const breadcrumbItems = (customerId: string) => [
  {
    title: 'Dashboard',
    url: `/${customerId}`,
    active: false,
  },
  {
    title: 'Invitations',
    url: `/${customerId}/invitations`,
    active: true,
  },
];

type Props = PageProps<'/[customerId]/invitations'>;

export default async function Page({ params }: Props) {
  //   const querySearch = await searchParams;

  //   const query: MetaRequest<Invitation> = {
  //     page: querySearch.page ? Number(querySearch.page) : 1,
  //     per_page: querySearch.per_page ? Number(querySearch.per_page) : 10,
  //     search: querySearch.search as string,
  //     sort_by: querySearch.sort_by as keyof Invitation,
  //     sort_order: querySearch.order_by as 'ASC' | 'DESC',
  //   };

  const { customerId } = await params;
  //   const queryClient = getQueryClient();
  //   void queryClient.prefetchQuery(queryGetGuests(customerId, query));
  const breadcrumbs = breadcrumbItems(customerId);

  return (
    <PageScreen title="Dashboard" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
