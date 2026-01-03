import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';
import { Component } from './_components';

export const permissions = [PERMISSIONS.CUSTOMER.READ_INVITATION];

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
    active: true,
  },
];

type Props = PageProps<'/[customerId]/guests/[guestId]'>;

export default async function Page({ params }: Props) {
  const { customerId, guestId } = await params;
  const breadcrumbs = breadcrumbItems(customerId, guestId);

  return (
    <PageScreen title="Guest" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
