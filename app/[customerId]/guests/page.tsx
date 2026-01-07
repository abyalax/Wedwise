import { PageScreen } from '~/components/layouts/page';
import { Component } from './_components';
import { AddGuestDialog } from './_components/add-guest-dialog';

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

export default async function Page({ params }: Props) {
  const { customerId } = await params;
  const breadcrumbs = breadcrumbItems(customerId);
  return (
    <PageScreen title="Guest" breadcrumbs={breadcrumbs} topActions={<AddGuestDialog />}>
      <Component />
    </PageScreen>
  );
}
