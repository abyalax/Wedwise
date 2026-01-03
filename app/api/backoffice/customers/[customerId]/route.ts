import { NextResponse } from 'next/server';

import { TResponse } from '~/common/types/response';
import { db } from '~/db';
import { Customer, customerUpdateSchema } from '~/db/schema';
import { NotFoundException } from '~/lib/handler/error';
import { safeHandler } from '~/lib/handler/safe-handler';

export const GET = safeHandler<{ customerId: string }>(async (_, { params }): Promise<NextResponse<TResponse<Customer>>> => {
  const { customerId } = await params;
  const data = await db.customer.findUnique({
    where: { id: Number(customerId) },
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

  if (!data) throw new NotFoundException('Customer not found');

  return NextResponse.json({
    data,
  });
});

export const PUT = safeHandler<{ customerId: string }>(async (req, { params }): Promise<NextResponse<TResponse<Customer>>> => {
  const { customerId } = await params;
  const body = await req.json();
  const parsed = customerUpdateSchema.parse(body);
  const updated = await db.customer.update({
    where: { id: Number(customerId) },
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
  if (!updated) throw new NotFoundException('Customer not found');
  return NextResponse.json({
    message: 'Client updated successfully',
    data: updated,
  });
});

export const DELETE = safeHandler<{ customerId: string }>(async (_, { params }): Promise<NextResponse<TResponse>> => {
  const { customerId } = await params;
  await db.customer.delete({
    where: { id: Number(customerId) },
  });
  return NextResponse.json({ message: 'Client deleted' }, { status: 204 });
});
