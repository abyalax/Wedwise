import { PageScreen } from '~/components/layouts/page';
import { Component } from './_components';

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
  const { customerId } = await params;
  const breadcrumbs = breadcrumbItems(customerId);

  return (
    <PageScreen title="Dashboard" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
