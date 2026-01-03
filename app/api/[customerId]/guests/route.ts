import { NextResponse } from 'next/server';

import { PERMISSIONS } from '~/common/const/permission';
import { MetaResponse } from '~/common/types/meta';
import { TResponse } from '~/common/types/response';
import { db } from '~/db';
import { paginate } from '~/db/helper';
import { Guest, guestInsertSchema } from '~/db/schema';
import { safeHandler } from '~/lib/handler/safe-handler';

export const permissions = [PERMISSIONS.CUSTOMER.READ_INVITATION, PERMISSIONS.CUSTOMER.CREATE_INVITATION];

export const GET = safeHandler(async (req): Promise<NextResponse<TResponse<{ data: Guest[]; meta: MetaResponse }>>> => {
  const pageParams = req.nextUrl.searchParams.get('page');
  const perPageParams = req.nextUrl.searchParams.get('per_page');
  const searchParams = req.nextUrl.searchParams.get('search');

  const page = pageParams ? Number(pageParams) : 1;
  const perPage = perPageParams ? Number(perPageParams) : 10;

  const where = searchParams
    ? {
        name: {
          contains: searchParams,
          mode: 'insensitive' as const,
        },
      }
    : undefined;

  const data = await paginate<Guest>({
    model: db.guest,
    page,
    perPage,
    where,
    searchField: searchParams ? 'name' : undefined,
    searchValue: searchParams,
  });

  return NextResponse.json({
    data,
  });
});

export const POST = safeHandler(async (req): Promise<NextResponse<TResponse<Guest>>> => {
  const body = await req.json();
  const parsed = guestInsertSchema.parse(body);
  const created = await db.guest.create({
    data: parsed,
  });
  return NextResponse.json({ data: created });
});
