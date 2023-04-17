'use client';

import { DetailUser, ProfileUser } from '@/model/user';
import useSWR from 'swr';

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { data: loggedInUser } = useSWR<DetailUser>('/api/me');
  const showButton = loggedInUser && loggedInUser.id !== user.id;
  const following = loggedInUser && loggedInUser.following.find((item) => item.id === user.id);

  const text = following ? 'Unfollow' : 'Follow';
  return (
    <>
      {showButton && (
        <button
          className={`border-none text-white text-lg font-bold rounded-md p-3 leading-4 ${
            following ? 'bg-pink-hot' : 'bg-green-light'
          }`}
        >
          {text}
        </button>
      )}
    </>
  );
}
