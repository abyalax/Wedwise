import { NextResponse } from 'next/server';

import { PERMISSIONS } from '~/common/const/permission';
import { TResponse } from '~/common/types/response';
import { safeHandler } from '~/lib/handler/safe-handler';

export const permissions = [PERMISSIONS.ADMIN.MANAGE_CUSTOMERS];

export const GET = safeHandler(async (req): Promise<NextResponse<TResponse>> => {
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

  // const data = await paginate<Customer>({
  //   model: db.customer,
  //   page,
  //   perPage,
  //   where,
  //   include: {
  //     user: {
  //       select: {
  //         id: true,
  //         name: true,
  //         email: true,
  //         phone: true,
  //       },
  //     },
  //   },
  //   searchField: searchParams ? 'name' : undefined,
  //   searchValue: searchParams,
  // });

  // return NextResponse.json({
  //   data,
  // });
  return NextResponse.json({ message: "Does'nt implemeneted yet", page, perPage, where });
});

export const POST = safeHandler(async (_req): Promise<NextResponse<TResponse>> => {
  return NextResponse.json({ message: "Does'nt implemeneted yet" });
});
