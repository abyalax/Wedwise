'use client';

import { FC } from 'react';
import { H1 } from '~/components/ui/typography';
import { CustomersTable } from './customers-table';

export const Component: FC = () => {
  return (
    <div>
      <div className="flex justify-between">
        <H1>Customers</H1>
      </div>

      <CustomersTable />
    </div>
  );
};
