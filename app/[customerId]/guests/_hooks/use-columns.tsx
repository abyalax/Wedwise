import { createColumnHelper } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { Guest as PrismaGuest } from '~/generated/prisma/browser';
import { NullToUndefined } from '~/lib/utils';
import { statusConfig } from '../_utils';
import { useDeleteGuest } from './use-delete-guest';

type Guest = NullToUndefined<PrismaGuest>;

const columnHelper = createColumnHelper<Guest>();
export type TGuestColumn = keyof Guest | 'select' | 'action';

type Params = {
  defaultVisible: TGuestColumn[];
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
        cell: ({ row }) => {
          const record = row.original;
          return (
            <div className="text-sm">
              {record.phone && <p>{record.phone}</p>}
              {record.email && <p className="text-muted-foreground">{record.email}</p>}
              {!record.phone && !record.email && <span className="text-muted-foreground">-</span>}
            </div>
          );
        },
      }),
      columnHelper.accessor('rsvpStatus', {
        id: 'rsvpStatus',
        header: 'Status RSVP',
        cell: ({ row }) => {
          const status = statusConfig[row.original.rsvpStatus];
          return <Badge className={status.className}>{status.label}</Badge>;
        },
      }),
      columnHelper.accessor('participant', {
        id: 'participant',
        header: 'Participant',
        cell: ({ row }) => (row.original.rsvpStatus === 'ATTENDED' ? row.original.participant : '-'),
      }),
      columnHelper.accessor('notes', {
        id: 'note',
        header: 'Note',
        cell: ({ row }) => {
          const record = row.original;
          const content = record.reason ? record.reason : record.notes;
          return content ?? '-';
        },
      }),
      columnHelper.display({
        id: 'action',
        header: 'Action',
        cell: (info) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toast.info('Soon')}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  deleteClient(info.row.original.id.toString());
                }}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      }),
    ],
    [deleteClient],
  );

  const columnIds = useMemo(() => columns.map((col) => col.id ?? ''), [columns]);

  const initialColumnVisibility = useMemo(() => {
    return columnIds.reduce(
      (acc, val) => {
        acc[val as TGuestColumn] = defaultVisible.includes(val as TGuestColumn);
        return acc;
      },
      {} as Record<TGuestColumn, boolean>,
    );
  }, [columnIds, defaultVisible]);

  return { columns, initialColumnVisibility, columnIds };
};
