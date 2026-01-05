import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { Guest, RsvpStatus } from '../_types';

interface GuestTableProps {
  guests: Guest[];
  onEdit?: (guest: Guest) => void;
  onDelete?: (guest: Guest) => void;
}

const statusConfig: Record<RsvpStatus, { label: string; className: string }> = {
  confirmed: {
    label: 'Hadir',
    className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  },
  pending: {
    label: 'Menunggu',
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  },
  declined: {
    label: 'Tidak Hadir',
    className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  },
};

export function GuestTable({ guests, onEdit, onDelete }: GuestTableProps) {
  if (guests.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Belum ada tamu yang ditambahkan</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead className="hidden sm:table-cell">Kontak</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Jumlah</TableHead>
            <TableHead className="hidden lg:table-cell">Catatan</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.map((guest) => {
            const status = statusConfig[guest.rsvpStatus];
            return (
              <TableRow key={guest.id}>
                <TableCell className="font-medium">{guest.name}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="text-sm">
                    {guest.phone && <p>{guest.phone}</p>}
                    {guest.email && <p className="text-muted-foreground">{guest.email}</p>}
                    {!guest.phone && !guest.email && <span className="text-muted-foreground">-</span>}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={status.className}>{status.label}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{guest.rsvpStatus === 'confirmed' ? guest.numberOfGuests : '-'}</TableCell>
                <TableCell className="hidden lg:table-cell max-w-[200px] truncate">{guest.notes || '-'}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit?.(guest)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete?.(guest)} className="text-destructive focus:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
