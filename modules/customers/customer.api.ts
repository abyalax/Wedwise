/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
import { MetaRequest } from '~/common/types/meta';
import { TAxiosResponse, TListPagination, TResponse } from '~/common/types/response';
import { Customer } from '~/generated/prisma/browser';
import { api } from '~/lib/axios/api';
import { handleGetError } from '~/lib/handler';

export const getCustomers = async (params?: MetaRequest<Customer>) => {
  try {
    const response = await api.get<TResponse<TListPagination<Customer>>>(`/backoffice/customers`, { params });
    return response;
  } catch (err) {
    handleGetError(err);
  }
};

export const getCustomer = async (customerId: string) => {
  try {
    const response = await api.get<TResponse<Customer>>(`/backoffice/customers/${customerId}`);
    return response;
  } catch (err) {
    handleGetError(err);
  }
};

export const createCustomer = async (payload: any) => {
  return api.post(`/backoffice/customers`, { ...payload });
};

export const updateCustomer = async (customerId: string, payload: any) => {
  return api.put(`/backoffice/customers/${customerId}`, { ...payload });
};

export const deleteCustomer = async (customerId: string): Promise<TAxiosResponse<boolean>> => {
  return api.delete(`/backoffice/customers/${customerId}`);
};
