import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { QUERY_KEY } from '~/common/const/querykey';
import { TResponse } from '~/common/types/response';
import { updateGuest } from '~/data/guests/guest.api';
import { FormDataGuest } from '../_components/form/schema';

export const useUpdateGuest = (customerId: string, guestId: string) => {
  const { back } = useRouter();
  return useMutation({
    mutationKey: [QUERY_KEY.GUEST.UPDATE, customerId, guestId],
    mutationFn: async (payload: FormDataGuest) => await updateGuest(customerId, guestId, payload),
    meta: { invalidateQueries: [QUERY_KEY.GUEST.GETS] },
    onSuccess: () => {
      toast.success('Successfully update guest');
      back();
    },
    onError: (error: AxiosError<TResponse>) => {
      const message = error.response?.data.message ?? 'Failed to update guest';
      console.log('useUpdateGuest error : ', error);
      toast.error(message);
    },
  });
};
