import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { QUERY_KEY } from '~/common/const/querykey';
import { TResponse } from '~/common/types/response';
import type { UpdateUser } from '~/db/schema.d';
import { updateCustomer } from '~/modules/customers/customer.api';

export const useUpdateCustomer = (customerId: string) => {
  const { back } = useRouter();
  return useMutation({
    mutationKey: [QUERY_KEY.CUSTOMER.UPDATE],
    mutationFn: async (payload: UpdateUser) => await updateCustomer(customerId, payload),
    meta: { invalidateQueries: [QUERY_KEY.CUSTOMER.GETS] },
    onSuccess: () => {
      toast.success('Successfully update customer');
      back();
    },
    onError: (error: AxiosError<TResponse>) => {
      const message = error.response?.data.message ?? 'Failed to update customer';
      console.log('useUpdateCustomer error : ', error);
      toast.error(message);
    },
  });
};
