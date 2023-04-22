'use client';

import useMe from '@/hooks/me';
import { ProfileUser } from '@/model/user';

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { id } = user;
  const { user: loggedInUser } = useMe();
  const showButton = loggedInUser && loggedInUser.id !== id;
  const following = loggedInUser && loggedInUser.following.find((item) => item.id === id);

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
