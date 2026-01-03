import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import { env } from '~/common/const/credential';
import { db } from '~/db';
import { UnauthorizedException, UnprocessableEntity } from '~/lib/handler/error';
import { safeHandler } from '~/lib/handler/safe-handler';

// TODO:
export const POST = safeHandler(async (req: NextRequest) => {
  const { token, password } = await req.json();
  const verifyToken = jwt.verify(token, env.JWT_SECRET) as { email: string };
  if (!verifyToken) throw new UnauthorizedException('Token Expired');

  const findByEmail = await db.user.findFirst({
    where: { email: verifyToken.email },
  });
  if (findByEmail) throw new UnprocessableEntity('Email already exist');

  const hashedPassword = await bcrypt.hash(password, 10);
  const updated = await db.user.update({
    where: { email: verifyToken.email },
    data: { password: hashedPassword },
  });
  if (!updated) throw new UnprocessableEntity('Update Password Failed');

  return NextResponse.json({
    message: 'Success Update Password',
    data: updated,
  });
});
