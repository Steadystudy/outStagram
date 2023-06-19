'use client';
import Link from 'next/link';
import { PacmanLoader } from 'react-spinners';
import Avatar from './Avatar';
import useMe from '@/hooks/me';

export default function FollowingBar() {
  const { user, isLoading, error } = useMe();
  const users = user?.following;

  return (
    <article className="w-full flex justify-center items-center my-4 p-4 shadow-sm shadow-gray-light rounded-lg min-h-[128px] overflow-x-auto">
      {isLoading ? (
        <PacmanLoader />
      ) : (
        (!users || users.length === 0) && <p>{`You dont' have following members`}</p>
      )}
      {users && users.length > 0 && (
        <ul className="flex w-full gap-4">
          {users.map(({ username, image }) => (
            <li key={username}>
              <Link href={`/user/${username}`} className="flex flex-col items-center w-20">
                <Avatar image={image} size="lg" />
                <p className="w-full pt-2 overflow-hidden text-center text-ellipsis">{username}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
