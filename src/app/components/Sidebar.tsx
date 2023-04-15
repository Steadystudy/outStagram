import { User } from '@/model/user';
import Avatar from './Avatar';

export default function Sidebar({ user: { image, username, name } }: { user: User }) {
  return (
    <>
      <div className="flex items-center mt-8">
        {image && <Avatar border={false} size="lg" image={image} />}
        <div className="ml-4">
          <h3 className="font-bold">{username}</h3>
          <p className="text-gray-hot leading-4">{name}</p>
        </div>
      </div>
      <p className="text-gray-hot mt-4">About ﹒ Help ﹒ API</p>
      <p className="font-bold mt-4">@Copyright OUTSTAGRAM from METAL</p>
    </>
  );
}
