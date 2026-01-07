'use client';

import { useParams, useRouter } from 'next/navigation';
import { FC } from 'react';
import { Flex } from '~/components/layouts/flex';
import { Button } from '~/components/ui/button';
import { H1, P } from '~/components/ui/typography';

export const Component: FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const { push } = useRouter();

  return (
    <div>
      <div className="flex justify-between">
        <H1>Invitations</H1>
        <Flex gap={20}>
          <Button onClick={() => push(`/${customerId}/invitations/create`)}>Create</Button>
          <Button onClick={() => push(`/${customerId}/invitations/create`)}>Select</Button>
        </Flex>
      </div>

      <P>Data Invitations</P>
    </div>
  );
};
