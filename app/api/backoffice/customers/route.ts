import { NextResponse } from 'next/server';

import { PERMISSIONS } from '~/common/const/permission';
import { MetaResponse } from '~/common/types/meta';
import { TResponse } from '~/common/types/response';
import { db } from '~/db';
import { paginate } from '~/db/helper';
import { Customer, customerInsertSchema } from '~/db/schema';
import { safeHandler } from '~/lib/handler/safe-handler';

export const permissions = [PERMISSIONS.ADMIN.MANAGE_CUSTOMERS];

export const GET = safeHandler(async (req): Promise<NextResponse<TResponse<{ data: Customer[]; meta: MetaResponse }>>> => {
  const pageParams = req.nextUrl.searchParams.get('page');
  const perPageParams = req.nextUrl.searchParams.get('per_page');
  const searchParams = req.nextUrl.searchParams.get('search');

  const page = pageParams ? Number(pageParams) : 1;
  const perPage = perPageParams ? Number(perPageParams) : 10;

  const where = searchParams
    ? {
        user: {
          name: {
            contains: searchParams,
            mode: 'insensitive' as const,
          },
        },
      }
    : undefined;

  const data = await paginate<Customer>({
    model: db.customer,
    page,
    perPage,
    where,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
    },
    searchField: searchParams ? 'name' : undefined,
    searchValue: searchParams,
  });

  return NextResponse.json({
    data,
  });
});

export const POST = safeHandler(async (req): Promise<NextResponse<TResponse<Customer>>> => {
  const body = await req.json();
  const parsed = customerInsertSchema.parse(body);
  const created = await db.customer.create({
    data: parsed,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
    },
  });
  return NextResponse.json({ data: created });
});
