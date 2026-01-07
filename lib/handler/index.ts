import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { TResponse } from '~/common/types/response';

export const handleGetError = <T>(err: unknown) => {
  const axiosErr = err as AxiosError<TResponse>;
  const message = axiosErr.response?.data.message;
  console.log(message);
  toast.warn(message);
  // prevent crash
  return {
    data: {
      data: {},
    },
  } as T;
};
