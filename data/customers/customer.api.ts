import { FormDataCustomer } from '~/app/backoffice/customers/_components/form/schema';
import { MetaRequest, MetaResponse } from '~/common/types/meta';
import { TAxiosResponse } from '~/common/types/response';
import { Customer } from '~/generated/prisma/browser';
import { api } from '~/lib/axios/api';
import { User } from '~/modules/users/users.type';

export const getCustomers = async (params?: MetaRequest<Customer>): Promise<TAxiosResponse<{ data: Customer[]; meta: MetaResponse }>> => {
  return api.get(`/backoffice/customers`, { params });
};

export const getCustomer = async (customerId: string): Promise<TAxiosResponse<User>> => {
  return api.get(`/backoffice/customers/${customerId}`);
};

export const createCustomer = async (payload: FormDataCustomer): Promise<TAxiosResponse<User>> => {
  return api.post(`/backoffice/customers`, { ...payload });
};

export const updateCustomer = async (customerId: string, payload: FormDataCustomer): Promise<TAxiosResponse<User>> => {
  return api.put(`/backoffice/customers/${customerId}`, { ...payload });
};

export const deleteCustomer = async (customerId: string): Promise<TAxiosResponse<boolean>> => {
  return api.delete(`/backoffice/customers/${customerId}`);
};
