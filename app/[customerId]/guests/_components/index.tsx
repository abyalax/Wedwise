'use client';

import { useParams, useRouter } from 'next/navigation';
import { FC, Suspense, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { FallBack } from '~/components/fragments/fallback';
import { H1 } from '~/components/ui/typography';
import { AddGuestDialog } from '../../_components/add-guest-dialog';
import { useGetGuests } from '../_hooks/use-get-guests';
import { Guest } from '../_types';
import { GuestTable } from './guest-table';

export const Component: FC = () => {
  // Local state for demo purposes (would be mutations in real app)
  const [localGuests, setLocalGuests] = useState<Guest[]>([]);
  const { customerId } = useParams<{ customerId: string }>();
  const { push } = useRouter();

  const { data: guests } = useGetGuests();

  const handleAddGuest = (guestData: Omit<Guest, 'id' | 'createdAt'>) => {
    const newGuest: Guest = {
      ...guestData,
      id: `local-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setLocalGuests((prev) => [...prev, newGuest]);
    toast.success(`${guestData.name} berhasil ditambahkan ke daftar tamu.`);
  };

  // Combine API guests with locally added guests
  const allGuests = useMemo(() => {
    return [...(guests ?? []), ...localGuests];
  }, [guests, localGuests]);

  return (
    <div>
      <div className="flex justify-between">
        <H1>Guests</H1>
        <AddGuestDialog onAdd={handleAddGuest} />
      </div>

      <Suspense fallback={<FallBack />}>
        <GuestTable guests={allGuests} />
      </Suspense>
    </div>
  );
};
