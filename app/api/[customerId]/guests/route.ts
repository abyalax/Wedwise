import { NextResponse } from 'next/server';
import { PERMISSIONS } from '~/common/const/permission';
import { TListPagination, TResponse } from '~/common/types/response';
import { Guest } from '~/generated/prisma/client';
import { safeHandler } from '~/lib/handler/safe-handler';
import { parseParams } from '~/lib/params';
import { guestService } from '~/server/guests/guest.service';

export const permissions = [PERMISSIONS.CUSTOMER.READ_INVITATION, PERMISSIONS.CUSTOMER.CREATE_INVITATION];

type GetResponse = NextResponse<TResponse<TListPagination<Guest>>>;

export const GET = safeHandler(async (req): Promise<GetResponse> => {
  const params = parseParams(req);
  const data = await guestService.paginateGuest(params);

  return NextResponse.json({
    data,
    message: 'Success get all guests',
  });
});

export const POST = safeHandler(async (req): Promise<NextResponse<TResponse>> => {
  const body = await req.json();
  const created = await guestService.create({
    ...body,
    customers: {
      connect: body.customerId,
    },
  });
  return NextResponse.json({ message: 'Success create data guest', data: created });
});
