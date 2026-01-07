'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import { QueryState } from '~/components/fragments/fallback/query-state';
import { Flex } from '~/components/layouts/flex';
import { H1 } from '~/components/ui/typography';
import { FormDataGuest } from '../../_components/form/guest-schema';
import { GuestDialog } from '../../_components/guest-dialog';
import { useGetGuest } from '../../_hooks/use-get-guest';
import { useUpdateGuest } from '../../_hooks/use-update-guest';

type Params = Awaited<PageProps<'/[customerId]/guests/[guestId]'>['params']>;

export const Component: FC = () => {
  const { customerId, guestId } = useParams<Params>();
  const { data, isLoading } = useGetGuest(customerId, guestId);
  const { mutate } = useUpdateGuest(customerId, guestId);
  const onSubmit = (v: FormDataGuest) => mutate(v);
  return (
    <div>
      <Flex justify="space-between">
        <H1>Detail Customer</H1>
        <GuestDialog initialValues={data} onSubmit={onSubmit} />
      </Flex>
      <QueryState isLoading={isLoading} data={data}>
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </QueryState>
    </div>
  );
};
