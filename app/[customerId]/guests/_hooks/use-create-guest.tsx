import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { QUERY_KEY } from '~/common/const/querykey';
import { TResponse } from '~/common/types/response';
import type { CreateGuest } from '~/db/schema.d';
import { createGuest } from '~/modules/guests/guest.api';

export const useCreateGuest = (customerId: string) => {
  const { back } = useRouter();
  return useMutation({
    mutationKey: [QUERY_KEY.GUEST.CREATE],
    mutationFn: async (payload: CreateGuest) => await createGuest(customerId, payload),
    meta: { invalidateQueries: [QUERY_KEY.GUEST.GETS] },
    onSuccess: () => {
      toast.success('Successfully create new guest');
      back();
    },
    onError: (error: AxiosError<TResponse>) => {
      const message = error.response?.data.message ?? 'Failed to create customer';
      console.log('useCreateGuest error : ', error);
      toast.error(message);
    },
  });
};
