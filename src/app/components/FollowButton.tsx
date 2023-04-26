'use client';

import useMe from '@/hooks/me';
import { ProfileUser } from '@/model/user';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { BeatLoader } from 'react-spinners';

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { id } = user;
  const { user: loggedInUser, toggleFollow } = useMe();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const showButton = loggedInUser && loggedInUser.id !== id;
  const following = loggedInUser && loggedInUser.following.find((item) => item.id === id);

  const text = following ? 'Unfollow' : 'Follow';

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(id, !following);
    setIsFetching(false);
    startTransition(() => router.refresh());
  };

  return (
    <>
      {showButton && (
        <button
          className={`border-none text-white text-lg font-bold rounded-md p-3 leading-4 ${
            following ? 'bg-pink-hot' : 'bg-green-light'
          }`}
          onClick={handleFollow}
        >
          {isUpdating ? <BeatLoader /> : text}
        </button>
      )}
    </>
  );
}
