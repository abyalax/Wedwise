import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/common/const/querykey';
import { MetaRequest } from '~/common/types/meta';
import { Guest as PrismaGuest } from '~/generated/prisma/browser';
import { NullToUndefined } from '~/lib/utils';
import { getGuests } from '~/modules/guests/guest.api';

type Guest = NullToUndefined<PrismaGuest>;

export const useGetGuests = (customerId: string, params: MetaRequest<Guest>) => {
  return useQuery({
    queryKey: [QUERY_KEY.GUEST.GETS, customerId, params],
    queryFn: () => getGuests(customerId, params),
    select: (data) => data.data.data,
  });
};
