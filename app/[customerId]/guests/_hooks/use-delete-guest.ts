import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { QUERY_KEY } from '~/common/const/querykey';
import { TResponse } from '~/common/types/response';
import { deleteGuest } from '~/data/guests/guest.api';

export const useDeleteGuest = (customerId: string) => {
  return useMutation({
    mutationKey: [QUERY_KEY.GUEST.DELETE],
    mutationFn: async (guestId: string) => await deleteGuest(customerId, guestId),
    meta: { invalidateQueries: [QUERY_KEY.GUEST.GETS] },
    onSuccess: () => {
      toast.success('Successfully delete guest');
    },
    onError: (error: AxiosError<TResponse>) => {
      const message = error.response?.data.message ?? 'Failed to delete guest';
      console.log('useDeleteGuest error : ', error);
      toast.error(message);
    },
  });
};
