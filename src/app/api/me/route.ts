import { getUserByUsername } from '@/service/user';
import { withSessionUser } from '@/util/session';
import { NextResponse } from 'next/server';

export async function GET() {
  return withSessionUser(async (user) => {
    return getUserByUsername(user.username) //
      .then((res) => NextResponse.json(res));
  });
}
