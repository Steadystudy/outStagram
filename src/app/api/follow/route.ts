import { follow, unfollow } from '@/service/user';
import { withSessionUser } from '@/util/session';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id: targetId, isFollow } = await req.json();

    if (!targetId || isFollow === undefined) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = isFollow ? follow : unfollow;

    return request(user.id, targetId)
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
  });
}
