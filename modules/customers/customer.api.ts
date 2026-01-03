import { MetaRequest, MetaResponse } from '~/common/types/meta';
import { TAxiosResponse } from '~/common/types/response';
import type { Customer } from '~/db/schema.d';
import { api } from '~/lib/axios/api';
import { CreateUser, UpdateUser, User } from '../../db/schema/users/users.schema';

export const getCustomers = async (params?: MetaRequest<Customer>): Promise<TAxiosResponse<{ data: Customer[]; meta: MetaResponse }>> => {
  return api.get(`/backoffice/customers`, { params });
};

export const getCustomer = async (customerId: string): Promise<TAxiosResponse<User>> => {
  return api.get(`/backoffice/customers/${customerId}`);
};

export const createCustomer = async (payload: CreateUser): Promise<TAxiosResponse<User>> => {
  return api.post(`/backoffice/customers`, { ...payload });
};

export const updateCustomer = async (customerId: string, payload: UpdateUser): Promise<TAxiosResponse<User>> => {
  return api.put(`/backoffice/customers/${customerId}`, { ...payload });
};

export const deleteCustomer = async (customerId: string): Promise<TAxiosResponse<boolean>> => {
  return api.delete(`/backoffice/customers/${customerId}`);
};
