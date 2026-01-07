'use client';

import { useParams } from 'next/navigation';
import { CustomerParams } from '../../_meta';
import { useCreateGuest } from '../_hooks/use-create-guest';
import { FormDataGuest } from './form/guest-schema';
import { GuestDialog } from './guest-dialog';

export const AddGuestDialog = () => {
  const { customerId } = useParams<CustomerParams>();
  const { mutate } = useCreateGuest(customerId, '1');
  const onSubmit = (values: FormDataGuest) => mutate(values);

  return <GuestDialog onSubmit={onSubmit} buttonText="Add Guest" isLoading={false} />;
};
