'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import { Flex } from '~/components/layouts/flex';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { FormCustomer } from '../../../_components/form';
import { FormDataGuest } from '../../../_components/form/schema';
import { useGetGuest } from '../../../_hooks/use-get-guest';
import { useUpdateGuest } from '../../../_hooks/use-update-guest';

type Params = Awaited<PageProps<'/[customerId]/guests/[guestId]/update'>['params']>;

export const Component: FC = () => {
  const { customerId, guestId } = useParams<Params>();
  const { mutate, isPending } = useUpdateGuest(customerId, guestId);
  const { data } = useGetGuest(customerId, guestId);
  const handleSubmit = (data: FormDataGuest) => {
    mutate({
      ...data,
      participant: data.participant ? Number(data.participant) : 1,
    });
  };

  const initialValues =
    data &&
    ({
      name: data.name,
      phone: data.phone,
      participant: data.participant.toString(),
      note: data.note ?? '',
      status: data.status,
    } as FormDataGuest);

  return (
    <Flex className="flex-1 items-center justify-center">
      <Card className="shadow-md lg:max-w-2xl w-full">
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
          <CardDescription>Please provide details data for the new customer.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormCustomer onSubmit={handleSubmit} buttonText="Update Customer" initialValues={initialValues} isLoading={isPending} />
        </CardContent>
      </Card>
    </Flex>
  );
};
