'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import { Flex } from '~/components/layouts/flex';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { FormCustomer } from '../../_components/form';
import { FormDataGuest } from '../../_components/form/schema';
import { useCreateGuest } from '../../_hooks/use-create-guest';

export const Component: FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const { mutate, isPending } = useCreateGuest(customerId);

  const handleSubmit = (data: FormDataGuest) => {
    mutate({
      ...data,
      participant: Number(data.participant),
    });
  };

  return (
    <Flex className="flex-1 items-center justify-center">
      <Card className="shadow-md lg:max-w-2xl w-full">
        <CardHeader>
          <CardTitle>Guest Information</CardTitle>
          <CardDescription>Please provide basic details for the new guests.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormCustomer onSubmit={handleSubmit} buttonText="Create Guest" isLoading={isPending} />
        </CardContent>
      </Card>
    </Flex>
  );
};
