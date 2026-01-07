import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/common/const/querykey';
import { getGuest } from '~/modules/guests/guest.api';

export const useGetGuest = (customerId: string, guestId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.GUEST.GET_BY_ID, customerId, guestId],
    queryFn: () => getGuest(customerId, guestId),
    select: (s) => s.data.data,
    retry: false,
  });
};
