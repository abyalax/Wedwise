import { NextResponse } from 'next/server';

import { PERMISSIONS } from '~/common/const/permission';
import { TListPagination, TResponse } from '~/common/types/response';
import { convertMetaPagination, prismaList, searchFilter } from '~/db/prisma/client';
import { Guest } from '~/generated/prisma/client';
import { safeHandler } from '~/lib/handler/safe-handler';

export const permissions = [PERMISSIONS.CUSTOMER.READ_INVITATION, PERMISSIONS.CUSTOMER.CREATE_INVITATION];

type GetResponse = TResponse<TListPagination<Guest>>;

export const GET = safeHandler(async (req): Promise<NextResponse<GetResponse>> => {
  const pageParams = req.nextUrl.searchParams.get('page');
  const perPageParams = req.nextUrl.searchParams.get('per_page');
  const searchParams = req.nextUrl.searchParams.get('search');

  const page = pageParams ? Number(pageParams) : 1;
  const perPage = perPageParams ? Number(perPageParams) : 10;

  const fieldSearchable = ['name', 'phone'];

  const [data, meta] = await prismaList.guest
    .paginate({
      where: {
        invitationId: 1,
        ...searchFilter(fieldSearchable, searchParams),
      },
    })
    .withPages({
      page,
      limit: perPage,
    });

  const metaPagination = convertMetaPagination(meta, 10);

  return NextResponse.json({
    data: {
      items: data,
      meta: metaPagination,
    },
    message: 'Success get all guests',
  });
});

export const POST = safeHandler(async (_req): Promise<NextResponse<TResponse>> => {
  return NextResponse.json({ message: "does'nt implemented yet" });
});
