'use client';

import { MailCheck, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import z from 'zod';
import { metaRequestSchema, sortingSchema } from '~/common/types/meta';
import { QueryState } from '~/components/fragments/fallback/query-state';
import { Table } from '~/components/fragments/table';
import { useSearch } from '~/components/hooks/use-search';
import { TGuestColumn, useColumns } from '../_hooks/use-columns';
import { useGetGuests } from '../_hooks/use-get-guests';
import { filters } from './filters';

export const GuestsTable = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const sortSchema = sortingSchema(['email', 'name', 'participant', 'rsvpStatus', 'reason', 'notes'] as TGuestColumn[]);
  const searchSchema = z.object({
    ...metaRequestSchema.shape,
    ...sortSchema.shape,
  });
  const search = useSearch(searchSchema);
  const { data, isLoading } = useGetGuests(customerId, {
    ...search,
    page: Number(search.page ?? 1),
    per_page: Number(search.per_page ?? 10),
  });
  const { columns, columnIds, initialColumnVisibility } = useColumns({
    defaultVisible: ['select', 'id', 'name', 'phone', 'rsvpStatus', 'participant', 'notes', 'action'],
  });

  return (
    <QueryState data={data} isLoading={isLoading}>
      <Table
        data={data}
        columns={columns}
        columnIds={columnIds}
        menufilter={filters()}
        onClickRow={(data) => console.log(data)}
        initialColumnVisibility={initialColumnVisibility}
        engineSide="server_side"
        pagination={true}
        bulkActions={[
          { icon: <MailCheck />, label: 'Send To Email', onClick: () => toast.info('Success gess') },
          { icon: <Trash2 />, label: 'Remove Data', onClick: () => toast.info('Success gess') },
          { icon: <MailCheck />, label: 'Send To Email', onClick: () => toast.info('Success gess') },
          { icon: <Trash2 />, label: 'Remove Data', onClick: () => toast.info('Success gess') },
        ]}
      />
    </QueryState>
  );
};
