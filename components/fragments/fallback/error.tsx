import { FC } from 'react';
import { toast } from 'react-toastify';

type Props = {
  error: string;
};

export const ErrorFallback: FC<Props> = ({ error }) => {
  toast.error(error);
  return <div>There was an error! {error}</div>;
};
