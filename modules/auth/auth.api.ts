import { api } from '~/lib/axios/api';

export type PayloadForgotPassword = {
  email: string;
};

export const forgotPassword = async (payload: PayloadForgotPassword) => {
  return await api.post('/auth/forgot-password', payload);
};

export type PayloadResetPassword = {
  token: string;
  password: string;
};

export const resetPassword = async (payload: PayloadResetPassword) => {
  return await api.post('/auth/reset-password', { data: payload });
};
