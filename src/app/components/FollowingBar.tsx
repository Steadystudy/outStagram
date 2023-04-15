'use client';
import { DetailUser } from '@/model/user';
import Link from 'next/link';
import { PacmanLoader } from 'react-spinners';
import useSWR from 'swr';
import Avatar from './Avatar';

export default function FollowingBar() {
  const { data, isLoading, error } = useSWR<DetailUser>('/api/me');
  const users = data?.following;

  return (
    <article className="w-full flex justify-center items-center my-4 p-4 shadow-sm shadow-gray-light rounded-lg min-h-[128px] overflow-x-auto">
      {isLoading ? (
        <PacmanLoader />
      ) : (
        (!users || users.length === 0) && <p>{`You dont' have following members`}</p>
      )}
      {users && users.length > 0 && (
        <ul className="w-full flex gap-4">
          {users.map(({ username, image }) => (
            <li key={username}>
              <Link href={`/user/${username}`} className="flex flex-col items-center w-20">
                <Avatar image={image} size="lg" />
                <p className="w-full text-center text-ellipsis overflow-hidden pt-2">{username}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
