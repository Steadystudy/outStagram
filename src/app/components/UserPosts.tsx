'use client';

import { ProfileUser } from '@/model/user';
import useSWR from 'swr';
import { useState } from 'react';

type Props = {
  user: ProfileUser;
};

export default function UserPosts({ user }: Props) {
  const { image, username, name, followers, following, posts } = user;

  const [tab, setTab] = useState('posts');
  const { data } = useSWR(`/api/users/${username}/${tab}`);

  return <div>UserPosts</div>;
}
