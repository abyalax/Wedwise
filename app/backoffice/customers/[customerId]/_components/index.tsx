'use client';

import { useParams, useRouter } from 'next/navigation';
import { FC } from 'react';
import { Flex } from '~/components/layouts/flex';
import { Button } from '~/components/ui/button';
import { H1 } from '~/components/ui/typography';
import { useGetCustomer } from '../../_hooks/use-get-customer';

export const Component: FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const { data } = useGetCustomer(customerId);
  const { push } = useRouter();
  const handleUpdate = () => push(`/backoffice/customers/${customerId}/update`);
  return (
    <div>
      <Flex justify="space-between">
        <H1>Detail Customer</H1>
        <Button onClick={handleUpdate}>Update</Button>
      </Flex>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
};
