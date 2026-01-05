import { PageScreen } from '~/components/layouts/page';
import './_meta';
import DashboardPage from './_components';

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

  return (
    <PageScreen title="Dashboard" breadcrumbs={breadcrumbs}>
      <DashboardPage />
    </PageScreen>
  );
}
