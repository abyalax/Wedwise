'use client';

import { FC, Suspense } from 'react';
import { FallBack } from '~/components/fragments/fallback';
import { H1 } from '~/components/ui/typography';
import { AddGuestDialog } from '../../_components/add-guest-dialog';
import { GuestTable } from './guest-table';

export const Component: FC = () => {
  return (
    <div>
      <div className="flex justify-between">
        <H1>Guests</H1>
        <AddGuestDialog />
      </div>

      <Suspense fallback={<FallBack />}>
        <GuestTable />
      </Suspense>
    </div>
  );
};
