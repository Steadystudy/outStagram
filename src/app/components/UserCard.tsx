import { ProfileUser } from '@/model/user';
import Avatar from './Avatar';

type Props = {
  user: ProfileUser;
};

export default function UserCard({ user }: Props) {
  const { name, username, image, following, followers } = user;

  return (
    <section>
      <Avatar image={image} size="lg" border={false} />
      <div>
        <p>{username}</p>
        <p>{name}</p>
        <span>{followers > 1 ? `${followers} followers` : `${followers} follower`}</span>
        <span>{`${following} following`}</span>
      </div>
    </section>
  );
}
