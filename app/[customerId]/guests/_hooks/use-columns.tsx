import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Checkbox } from '~/components/ui/checkbox';
import type { Guest } from '~/db/schema.d';
import { useDeleteGuest } from './use-delete-guest';

const columnHelper = createColumnHelper<Guest>();
export type TUserColumn = keyof Guest | 'select' | 'action';

type Params = {
  defaultVisible: TUserColumn[];
};

export const useColumns = ({ defaultVisible }: Params) => {
  const { customerId } = useParams<{ customerId: string }>();
  const { mutate: deleteClient } = useDeleteGuest(customerId);

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            className="cursor-pointer"
            checked={table.getIsAllRowsSelected() ? true : table.getIsSomeRowsSelected() ? 'indeterminate' : false}
            onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
            onClick={(e) => e.stopPropagation()}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            className="cursor-pointer"
            checked={row.getIsSelected()}
            onClick={(e) => e.stopPropagation()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
      }),
      columnHelper.accessor('name', {
        id: 'name',
        header: 'Name',
      }),
      columnHelper.accessor('phone', {
        id: 'phone',
        header: 'Phone',
      }),
      columnHelper.accessor('status', {
        id: 'status',
        header: 'Status',
      }),
      columnHelper.accessor('participant', {
        id: 'participant',
        header: 'Participant',
      }),
      columnHelper.accessor('note', {
        id: 'note',
        header: 'Note',
      }),
      columnHelper.display({
        id: 'action',
        header: 'Action',
        cell: (info) => (
          <div className="flex items-center gap-2">
            <Link
              href={`/${customerId}/guests/${info.row.original.id}/update`}
              onClick={(e) => e.stopPropagation()}
              className="text-gray-700 hover:text-blue-600"
            >
              <FaPencilAlt />
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                deleteClient(info.row.original.id.toString());
              }}
              className="text-red-600 hover:text-red-800"
            >
              <FaTrash />
            </button>
          </div>
        ),
      }),
    ],
    [deleteClient, customerId],
  );

  const columnIds = useMemo(() => columns.map((col) => col.id), [columns]);

  const initialColumnVisibility = useMemo(() => {
    return columnIds.reduce(
      (acc, val) => {
        acc[val as TUserColumn] = defaultVisible.includes(val as TUserColumn);
        return acc;
      },
      {} as Record<TUserColumn, boolean>,
    );
  }, [columnIds, defaultVisible]);

  return { columns, initialColumnVisibility, columnIds };
};
