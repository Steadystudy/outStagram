import { deletePost, getPost } from '@/service/posts';
import { withSessionUser } from '@/util/session';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { id: string };
};

export async function GET(request: NextRequest, context: Context) {
  return withSessionUser(async (user) => {
    return getPost(context.params.id) //
      .then((res) => NextResponse.json(res));
  });
}

export async function DELETE(req: NextRequest, context: Context) {
  return deletePost(context.params.id);
}
