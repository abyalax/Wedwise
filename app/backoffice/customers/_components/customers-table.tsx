'use client';

import { metaRequestSchema } from '~/common/types/meta';
import { QueryState } from '~/components/fragments/fallback/query-state';
import { Table } from '~/components/fragments/table';
import { useSearch } from '~/components/hooks/use-search';
import { useColumns } from '../_hooks/use-columns';
import { useGetCustomers } from '../_hooks/use-get-customers';

export const CustomersTable = () => {
  const search = useSearch(metaRequestSchema);

  const { data, isLoading } = useGetCustomers({
    page: Number(search.page ?? 1),
    per_page: Number(search.per_page ?? 10),
    search: search.search as string,
  });

  const { columns, columnIds, initialColumnVisibility } = useColumns({
    defaultVisible: ['select', 'note', 'action'],
  });

  return (
    <QueryState isLoading={isLoading}>
      <Table
        data={data}
        columns={columns}
        columnIds={columnIds}
        initialColumnVisibility={initialColumnVisibility}
        onClickRow={(data) => console.log(data)}
        pagination={true}
      />
    </QueryState>
  );
};
