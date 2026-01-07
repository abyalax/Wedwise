import { ReactNode } from 'react';
import { EmptyState, EmptyStateProps } from './empty-state';
import { Loading } from './loading';

type Props<T> = {
  children: ReactNode;
  data?: T;
  isLoading: boolean;
  emptyProps?: EmptyStateProps;
};

export function QueryState<T>({ isLoading, data, children, emptyProps }: Props<T>) {
  if (isLoading) return <Loading />;
  if (!data) return <EmptyState {...emptyProps} />;
  return children;
}
