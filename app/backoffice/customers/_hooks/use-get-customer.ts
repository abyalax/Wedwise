import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '~/common/const/querykey';
import { getCustomer } from '~/data/customers/customer.api';

export const queryGetCustomer = (customerId: string) =>
  queryOptions({
    queryKey: [QUERY_KEY.CUSTOMER.GET_BY_ID, customerId],
    queryFn: () => getCustomer(customerId),
    select: (data) => data.data.data,
  });

export const useGetCustomer = (customerId: string) => {
  return useSuspenseQuery(queryGetCustomer(customerId));
};
