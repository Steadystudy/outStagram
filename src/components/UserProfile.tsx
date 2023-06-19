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
    <section className="w-full flex flex-col md:flex-row items-center justify-center py-10 border-b border-gray-light">
      <Avatar image={image} size="2xl" />
      <div className="md:ml-8 basis-1/3">
        <div className="flex flex-col items-center md:flex-row gap-6 my-4">
          <h1 className="text-3xl font-bold">{username}</h1>
          <FollowButton user={user} />
        </div>
        <ul className="flex gap-3 mb-2">
          {info.map(({ title, data }) => (
            <li key={title}>
              <span className="font-bold">{`${data} ${title}`}</span>
            </li>
          ))}
        </ul>
        <p className="text-xl text-center md:text-start">{name}</p>
      </div>
    </section>
  );
}
