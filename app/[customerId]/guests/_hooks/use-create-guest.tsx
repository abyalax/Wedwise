import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { QUERY_KEY } from '~/common/const/querykey';
import { TResponse } from '~/common/types/response';
import { createGuest } from '~/modules/guests/guest.api';
import { FormDataGuest } from '../_components/form/guest-schema';

export const useCreateGuest = (customerId: string, invitationId: string) => {
  const { back } = useRouter();
  return useMutation({
    mutationKey: [QUERY_KEY.GUEST.CREATE],
    mutationFn: async (payload: FormDataGuest) => await createGuest(customerId, invitationId, payload),
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
