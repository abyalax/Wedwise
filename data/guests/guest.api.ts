import { FormDataGuest } from '~/app/[customerId]/guests/_components/form/schema';
import { MetaRequest } from '~/common/types/meta';
import { TListPagination, TResponse } from '~/common/types/response';
import { Guest } from '~/generated/prisma/browser';
import { api } from '~/lib/axios/api';

export const getGuests = async (customerId: string, params?: MetaRequest<Guest>) => {
  return api.get<TResponse<TListPagination<Guest>>>(`/${customerId}/guests`, { params });
};

export const getGuest = async (customerId: string, guestId: string) => {
  return api.get<TResponse<Guest>>(`/${customerId}/guests/${guestId}`);
};

export const createGuest = async (customerId: string, payload: FormDataGuest) => {
  return api.post<TResponse<Guest>>(`/${customerId}/guests`, { ...payload });
};

export const updateGuest = async (customerId: string, guestId: string, payload: FormDataGuest) => {
  return api.put<TResponse<Guest>>(`/${customerId}/guests/${guestId}`, { ...payload });
};

export const deleteGuest = async (customerId: string, guestId: string) => {
  return api.delete<TResponse<boolean>>(`/${customerId}/guests/${guestId}`);
};
