import { PageScreen } from '~/components/layouts/page';
import './_meta';

const breadcrumbItems = [
  {
    title: 'Home',
    url: '/',
    active: false,
  },
  {
    title: 'Dashboard',
    url: '/backoffice',
    active: true,
  },
  {
    title: 'Customers',
    url: '/backoffice/customers',
    active: false,
  },
];

export default function Page() {
  return <PageScreen title="Dashboard" breadcrumbs={breadcrumbItems} />;
}
