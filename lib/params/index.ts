import { NextRequest } from 'next/server';
import { MetaRequest, SortOrder } from '~/common/types/meta';

export function parseParams(req: NextRequest): MetaRequest {
  const pageParams = req.nextUrl.searchParams.get('page');
  const perPageParams = req.nextUrl.searchParams.get('per_page');
  const search = req.nextUrl.searchParams.get('search') ?? undefined;
  const sort_by = req.nextUrl.searchParams.get('sort_by') ?? undefined;
  const sort_order = req.nextUrl.searchParams.get('sort_order') as SortOrder;
  const page = pageParams ? Number(pageParams) : 1;
  const per_page = perPageParams ? Number(perPageParams) : 10;
  return {
    page,
    per_page,
    search,
    sort_by,
    sort_order,
  };
}
