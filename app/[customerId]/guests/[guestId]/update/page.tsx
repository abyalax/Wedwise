import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';
import { getQueryClient } from '~/lib/query/client';
import { queryGetGuest } from '../../_hooks/use-get-guest';
import { Component } from './_components';

export const permissions = [PERMISSIONS.CUSTOMER.UPDATE_INVITATION];

const breadcrumbItems = (customerId: string, guestId: string) => [
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
    title: 'Detail Guests',
    url: `/${customerId}/guests/${guestId}`,
    active: false,
  },
  {
    title: 'Update Guests',
    url: `/${customerId}/guests/${guestId}/update`,
    active: true,
  },
];

type Props = PageProps<'/[customerId]/guests/[guestId]/update'>;

export default async function Page({ params }: Props) {
  const queryClient = getQueryClient();
  const { customerId, guestId } = await params;
  const breadcrumbs = breadcrumbItems(customerId, guestId);

  void queryClient.prefetchQuery(queryGetGuest(customerId, guestId));

  return (
    <PageScreen title="Update Guest" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
