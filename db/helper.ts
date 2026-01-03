import type { Prisma } from '~/generated/prisma/client';
import type { MetaResponse } from '~/common/types/meta';

interface PaginateOptions<T = any> {
  model: {
    findMany: (args: any) => Promise<T[]>;
    count: (args: any) => Promise<number>;
  };
  page: number;
  perPage: number;
  where?: Prisma.Enumerable<T>;
  include?: Prisma.Enumerable<T>;
  select?: Prisma.Enumerable<T>;
  orderBy?: Prisma.Enumerable<T>;
  searchField?: string;
  searchValue?: string;
}

export async function paginate<T>({
  model,
  page,
  perPage,
  where,
  include,
  select,
  orderBy,
  searchField,
  searchValue,
}: PaginateOptions<T>): Promise<{ data: T[]; meta: MetaResponse }> {
  const skip = (page - 1) * perPage;

  // Build where clause with search if provided
  let finalWhere = where;
  if (searchField && searchValue) {
    finalWhere = {
      ...(where as object),
      [searchField]: {
        contains: searchValue,
        mode: 'insensitive' as const,
      },
    } as Prisma.Enumerable<T>;
  }

  // Execute queries in parallel
  const [data, totalCount] = await Promise.all([
    model.findMany({
      where: finalWhere,
      include,
      select,
      orderBy,
      skip,
      take: perPage,
    }),
    model.count({
      where: finalWhere,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / perPage);

  return {
    data,
    meta: {
      page,
      per_page: perPage,
      total_count: totalCount,
      total_pages: totalPages,
    },
  };
}

