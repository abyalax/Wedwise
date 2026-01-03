import { MetaRequest, MetaResponse } from '~/common/types/meta';
import { TAxiosResponse } from '~/common/types/response';
import type { CreateGuest, Guest, UpdateGuest } from '~/db/schema.d';
import { api } from '~/lib/axios/api';

export const getGuests = async (customerId: string, params?: MetaRequest<Guest>): Promise<TAxiosResponse<{ data: Guest[]; meta: MetaResponse }>> => {
  return api.get(`/${customerId}/guests`, { params });
};

export const getGuest = async (customerId: string, guestId: string): Promise<TAxiosResponse<Guest>> => {
  return api.get(`/${customerId}/guests/${guestId}`);
};

export const createGuest = async (customerId: string, payload: CreateGuest): Promise<TAxiosResponse<Guest>> => {
  return api.post(`/${customerId}/guests`, { ...payload });
};

export const updateGuest = async (customerId: string, guestId: string, payload: UpdateGuest): Promise<TAxiosResponse<Guest>> => {
  return api.put(`/${customerId}/guests/${guestId}`, { ...payload });
};

export const deleteGuest = async (customerId: string, guestId: string): Promise<TAxiosResponse<boolean>> => {
  return api.delete(`/${customerId}/guests/${guestId}`);
};
