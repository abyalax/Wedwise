import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '~/common/const/querykey';
import { getGuest } from '~/modules/guests/guest.api';

export const queryGetGuest = (customerId: string, guestId: string) =>
  queryOptions({
    queryKey: [QUERY_KEY.GUEST.GET_BY_ID, customerId, guestId],
    queryFn: () => getGuest(customerId, guestId),
    select: (data) => data.data.data,
  });

export const useGetGuest = (customerId: string, guestId: string) => {
  return useSuspenseQuery(queryGetGuest(customerId, guestId));
};
