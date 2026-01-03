'use client';

import { useRouter } from 'next/navigation';
import { FC, Suspense } from 'react';
import { FallBack } from '~/components/fragments/fallback';
import { Button } from '~/components/ui/button';
import { H1 } from '~/components/ui/typography';
import { CustomersTable } from './customers-table';

export const Component: FC = () => {
  const { push } = useRouter();

  return (
    <div>
      <div className="flex justify-between">
        <H1>Customers</H1>
        <Button onClick={() => push('/backoffice/customers/create')}>Create New Customers</Button>
      </div>

      <Suspense fallback={<FallBack />}>
        <CustomersTable />
      </Suspense>
    </div>
  );
};
