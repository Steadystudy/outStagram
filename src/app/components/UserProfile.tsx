import { ProfileUser } from '@/model/user';
import Avatar from './Avatar';
import FollowButton from './FollowButton';

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
  const { image, username, name, followers, following, posts } = user;
  const info = [
    { title: posts > 1 ? 'posts' : 'post', data: posts },
    { title: followers > 1 ? 'followers' : 'follower', data: followers },
    { title: 'following', data: following },
  ];

  return (
    <section>
      <Avatar image={image} />
      <div>
        <h1>{username}</h1>
        <FollowButton user={user} />
        <ul>
          {info.map(({ title, data }) => (
            <li key={title}>
              <span>{`${data} ${title}`}</span>
            </li>
          ))}
        </ul>
        <p>{name}</p>
      </div>
    </section>
  );
}
