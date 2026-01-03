import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '~/common/const/querykey';
import { MetaRequest } from '~/common/types/meta';
import { getCustomers } from '~/data/customers/customer.api';
import type { Customer } from '~/db/schema.d';

export const queryGetCustomers = (params: MetaRequest<Customer>) =>
  queryOptions({
    queryKey: [QUERY_KEY.CUSTOMER.GETS, params],
    queryFn: () => getCustomers(params),
    select: (data) => data.data.data,
  });

export const useGetCustomers = (params: MetaRequest<Customer>) => {
  return useSuspenseQuery(queryGetCustomers(params));
};
