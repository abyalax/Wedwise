'use client';

import { useParams, useRouter } from 'next/navigation';
import { FC, Suspense } from 'react';
import { FallBack } from '~/components/fragments/fallback';
import { Button } from '~/components/ui/button';
import { H1 } from '~/components/ui/typography';
import { GuestsTable } from './guest-table';

export const Component: FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const { push } = useRouter();

  return (
    <div>
      <div className="flex justify-between">
        <H1>Guests</H1>
        <Button onClick={() => push(`/${customerId}/guests/create`)}>Create New Guests</Button>
      </div>

      <Suspense fallback={<FallBack />}>
        <GuestsTable />
      </Suspense>
    </div>
  );
};
