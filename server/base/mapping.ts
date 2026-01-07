/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
import { Sorting } from '~/common/types/meta';
import { Prisma } from '~/generated/prisma/client';

export function mapJson<T>(data: any): T {
  return data as T;
}

export function mapSorting<Entity, OrderBy extends Record<string, any>>(sorting: Sorting<Entity> | undefined, allowedFields: readonly (keyof OrderBy)[]) {
  if (!sorting?.sort_by || !sorting.sort_order) return {};
  const field = sorting.sort_by as keyof OrderBy;
  if (!allowedFields.includes(field)) return {};

  const order: Prisma.SortOrder = sorting.sort_order === 'ASC' ? 'asc' : 'desc';
  return {
    [field]: order,
  };
}
