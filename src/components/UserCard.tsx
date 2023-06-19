import { ProfileUser } from '@/model/user';
import Avatar from './Avatar';
import Link from 'next/link';

type Props = {
  user: ProfileUser;
};

export default function UserCard({ user }: Props) {
  const { name, username, image, following, followers } = user;

  return (
    <Link href={`/user/${username}`}>
      <section className="w-full flex border border-gray-hot rounded-sm shadow-md p-4 mb-4">
        <Avatar image={image} size="lg" border={false} />
        <div className="ml-4">
          <p className="font-bold text-lg">{username}</p>
          <p>{name}</p>
          <p className="text-gray-hot">
            {followers > 1 ? `${followers} followers` : `${followers} follower`}{' '}
            {`${following} following`}
          </p>
        </div>
      </section>
    </Link>
  );
}
