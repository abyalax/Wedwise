import { Metadata } from 'next';
import { PERMISSIONS } from '~/common/const/permission';
import { MetaRequest } from '~/common/types/meta';
import { PageScreen } from '~/components/layouts/page';
import type { Customer } from '~/db/schema.d';
import { getQueryClient } from '~/lib/query/client';
import { Component } from './_components';
import { queryGetCustomers } from './_hooks/use-get-customers';

export const metadata: Metadata = {
  title: 'Customer Management | Dashboard',
  description: 'Manage accounts, roles, and permissions in the admin dashboard',
  keywords: 'management, admin, roles, permissions',
};

export const permissions = [PERMISSIONS.ADMIN.MANAGE_CUSTOMERS];

const breadcrumbItems = [
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
    active: true,
  },
];

type Props = PageProps<'/backoffice/customers'>;

export default async function Page({ searchParams }: Props) {
  const querySearch = await searchParams;

  const query: MetaRequest<Customer> = {
    page: querySearch.page ? Number(querySearch.page) : 1,
    per_page: querySearch.per_page ? Number(querySearch.per_page) : 10,
    search: querySearch.search as string,
    sort_by: querySearch.sort_by as keyof Customer,
    sort_order: querySearch.order_by as 'ASC' | 'DESC',
  };

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(queryGetCustomers(query));

  return (
    <PageScreen title="Customers" breadcrumbs={breadcrumbItems}>
      <Component />
    </PageScreen>
  );
}
