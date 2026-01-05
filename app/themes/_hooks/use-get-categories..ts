import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '~/common/const/querykey';
import { ThemeCategory } from '../_types';

const categories: { value: ThemeCategory; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'rustic', label: 'Rustic' },
  { value: 'elegant', label: 'Elegant' },
  { value: 'modern', label: 'Modern' },
  { value: 'romantic', label: 'Romantic' },
  { value: 'tropical', label: 'Tropical' },
];

export const queryGetCategoryThemes = () =>
  queryOptions({
    queryKey: [QUERY_KEY.GUEST.GET_BY_ID],
    queryFn: () => categories,
  });

export const useGetCategoryThemes = () => {
  return useSuspenseQuery(queryGetCategoryThemes());
};
