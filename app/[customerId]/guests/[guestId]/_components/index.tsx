'use client';

import { useParams, useRouter } from 'next/navigation';
import { FC } from 'react';
import { Flex } from '~/components/layouts/flex';
import { Button } from '~/components/ui/button';
import { H1 } from '~/components/ui/typography';
import { useGetGuest } from '../../_hooks/use-get-guest';

type Params = Awaited<PageProps<'/[customerId]/guests/[guestId]'>['params']>;

export const Component: FC = () => {
  const { customerId, guestId } = useParams<Params>();
  const { data } = useGetGuest(customerId, guestId);
  const { push } = useRouter();
  const handleUpdate = () => push(`/${customerId}/guests/${guestId}/update`);
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
