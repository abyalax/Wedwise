import { NextResponse } from 'next/server';

import { PERMISSIONS } from '~/common/const/permission';
import { TResponse } from '~/common/types/response';
import { prisma } from '~/db/prisma/client';
import { Guest } from '~/generated/prisma/client';
import { safeHandler } from '~/lib/handler/safe-handler';
import { guestService } from '~/server/guests/guest.service';

export const permissions = [PERMISSIONS.CUSTOMER.READ_INVITATION, PERMISSIONS.CUSTOMER.UPDATE_INVITATION, PERMISSIONS.CUSTOMER.DELETE_INVITATION];
type GuestParams = { guestId: string };

type GetResponse = NextResponse<TResponse<Guest>>;

export const GET = safeHandler<GuestParams>(async (_, { params }): Promise<GetResponse> => {
  const guestId = (await params).guestId;
  const data = await guestService.findById(guestId);
  return NextResponse.json({
    message: 'Success get data guest',
    data,
  });
});

export const PUT = safeHandler<{ guestId: string }>(async (req, { params }): Promise<NextResponse<TResponse>> => {
  const { guestId } = await params;
  const body = await req.json();
  return NextResponse.json({
    message: "Does'nt implemented yet",
    data: {
      body,
      guestId,
    },
  });
});

export const DELETE = safeHandler<{ guestId: string }>(async (_, { params }): Promise<NextResponse<TResponse>> => {
  const { guestId } = await params;
  await prisma.guest.delete({
    where: { id: Number(guestId) },
  });
  return NextResponse.json({ message: 'Client deleted', data: undefined }, { status: 204 });
});
