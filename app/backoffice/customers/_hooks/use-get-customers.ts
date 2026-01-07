import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/common/const/querykey';
import { MetaRequest } from '~/common/types/meta';
import { Customer } from '~/generated/prisma/browser';
import { getCustomers } from '~/modules/customers/customer.api';

export const useGetCustomers = (params: MetaRequest<Customer>) => {
  return useQuery({
    queryKey: [QUERY_KEY.CUSTOMER.GETS, params],
    queryFn: () => getCustomers(params),
    select: (data) => data?.data.data,
  });
};
