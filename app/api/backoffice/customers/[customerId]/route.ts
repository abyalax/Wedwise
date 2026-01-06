import { NextResponse } from 'next/server';

import { TResponse } from '~/common/types/response';
import { prisma } from '~/db/prisma/client';
import { Customer } from '~/generated/prisma/browser';
import { safeHandler } from '~/lib/handler/safe-handler';

export const GET = safeHandler<{ customerId: string }>(async (_, { params }): Promise<NextResponse<TResponse>> => {
  const { customerId } = await params;
  return NextResponse.json({
    message: "Does'nt implemented yet",
    data: { customerId },
  });
});

export const PUT = safeHandler<{ customerId: string }>(async (req, { params }): Promise<NextResponse<TResponse<Customer>>> => {
  // const { customerId } = await params;
  // const body = await req.json();
  // const parsed = customerUpdateSchema.parse(body);
  return NextResponse.json({
    message: "Does'nt implemented yet",
  });
});

export const DELETE = safeHandler<{ customerId: string }>(async (_, { params }): Promise<NextResponse<TResponse>> => {
  const { customerId } = await params;
  await prisma.customer.delete({
    where: { id: Number(customerId) },
  });
  return NextResponse.json({ message: 'Client deleted' }, { status: 204 });
});
