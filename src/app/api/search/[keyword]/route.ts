import { searchUser } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { keyword: string };
};

export async function GET(_: NextRequest, context: Context) {
  return searchUser(context.params.keyword) //
    .then((res) => NextResponse.json(res));
}
