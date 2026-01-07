import { FormDataGuest } from '~/app/[customerId]/guests/_components/form/guest-schema';
import { MetaRequest } from '~/common/types/meta';
import { TListPagination, TResponse } from '~/common/types/response';
import { Guest as PrismaGuest } from '~/generated/prisma/browser';
import { api } from '~/lib/axios/api';
import { handleGetError } from '~/lib/handler';
import { NullToUndefined } from '~/lib/utils';

type Guest = NullToUndefined<PrismaGuest>;

export const getGuests = async (customerId: string, params?: MetaRequest<Guest>) => {
  try {
    const response = await api.get<TResponse<TListPagination<Guest>>>(`/${customerId}/guests`, { params });
    return response;
  } catch (err) {
    throw handleGetError(err);
  }
};

export const getGuest = async (customerId: string, guestId: string) => {
  try {
    const response = await api.get<TResponse<Guest>>(`/${customerId}/guests/${guestId}`);
    return response;
  } catch (err) {
    throw handleGetError<TResponse<Guest>>(err);
  }
};

export const createGuest = async (customerId: string, invitationId: string, payload: FormDataGuest) => {
  return api.post<TResponse<Guest>>(`/${customerId}/guests`, { ...payload, invitationId });
};

export const updateGuest = async (customerId: string, guestId: string, payload: FormDataGuest) => {
  return api.put<TResponse<Guest>>(`/${customerId}/guests/${guestId}`, { ...payload });
};

export const deleteGuest = async (customerId: string, guestId: string) => {
  return api.delete<TResponse<boolean>>(`/${customerId}/guests/${guestId}`);
};
