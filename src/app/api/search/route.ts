import { searchUser } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest) {
  return searchUser() //
    .then((res) => NextResponse.json(res));
}
