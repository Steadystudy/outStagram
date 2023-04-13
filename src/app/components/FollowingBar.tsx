'use client';
import { DetailUser } from '@/model/user';
import Link from 'next/link';
import { PacmanLoader } from 'react-spinners';
import useSWR from 'swr';
import Avatar from './Avatar';

export default function FollowingBar() {
  const { data, isLoading, error } = useSWR<DetailUser>('/api/posts');
  const users = data?.following;

  return (
    <section>
      {isLoading ? (
        <PacmanLoader />
      ) : (
        (!users || users.length === 0) && <p>{`You dont' have following members`}</p>
      )}
      {users && users.length > 0 && (
        <ul>
          {users.map(({ username, image }) => (
            <li key={username}>
              <Link href={`/user/${username}`}>
                <Avatar image={image} />
                <p>{username}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
