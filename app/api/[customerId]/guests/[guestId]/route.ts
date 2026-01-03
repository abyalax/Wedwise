import { NextResponse } from 'next/server';

import { PERMISSIONS } from '~/common/const/permission';
import { TResponse } from '~/common/types/response';
import { db } from '~/db';
import { Guest, GuestWithConversationsAndInvitation, guestUpdateSchema } from '~/db/schema';
import { NotFoundException } from '~/lib/handler/error';
import { safeHandler } from '~/lib/handler/safe-handler';

export const permissions = [PERMISSIONS.CUSTOMER.READ_INVITATION, PERMISSIONS.CUSTOMER.UPDATE_INVITATION, PERMISSIONS.CUSTOMER.DELETE_INVITATION];

export const GET = safeHandler<{ guestId: string }>(async (_, { params }): Promise<NextResponse<TResponse<GuestWithConversationsAndInvitation>>> => {
  const { guestId } = await params;
  const data = await db.guest.findUnique({
    where: { id: Number(guestId) },
    include: {
      conversation: true,
      invitations: true,
    },
  });

  if (!data) throw new NotFoundException('Guest not found');

  const conversations = data.conversation ? [data.conversation] : [];

  return NextResponse.json({
    data: {
      ...data,
      conversations,
      invitation: data.invitations,
    },
  });
});

export const PUT = safeHandler<{ guestId: string }>(async (req, { params }): Promise<NextResponse<TResponse<Guest>>> => {
  const { guestId } = await params;
  const body = await req.json();
  const parsed = guestUpdateSchema.parse(body);
  const updated = await db.guest.update({
    where: { id: Number(guestId) },
    data: parsed,
  });
  if (!updated) throw new NotFoundException('Guest not found');
  return NextResponse.json({
    message: 'Client updated successfully',
    data: updated,
  });
});

export const DELETE = safeHandler<{ guestId: string }>(async (_, { params }): Promise<NextResponse<TResponse>> => {
  const { guestId } = await params;
  await db.guest.delete({
    where: { id: Number(guestId) },
  });
  return NextResponse.json({ message: 'Client deleted' }, { status: 204 });
});
