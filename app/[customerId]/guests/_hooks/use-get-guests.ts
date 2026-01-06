import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '~/common/const/querykey';
import { MetaRequest } from '~/common/types/meta';
import { getGuests } from '~/data/guests/guest.api';
import { Guest } from '~/generated/prisma/browser';

export const queryGetGuests = (customerId: string, params: MetaRequest<Guest>) =>
  queryOptions({
    queryKey: [QUERY_KEY.GUEST.GETS, customerId, params],
    queryFn: () => getGuests(customerId, params),
    select: (data) => data.data.data,
  });

export const useGetGuests = (customerId: string, params: MetaRequest<Guest>) => {
  return useSuspenseQuery(queryGetGuests(customerId, params));
};
