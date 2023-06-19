import { OAuthUser } from '@/model/user';
import Avatar from './Avatar';

export default function Sidebar({ user: { image, username, name } }: { user: OAuthUser }) {
  return (
    <>
      <div className="flex items-center mt-8">
        {image && <Avatar border={false} size="lg" image={image} />}
        <div className="ml-4">
          <h3 className="font-bold">{username}</h3>
          <p className="leading-4 text-gray-hot">{name}</p>
        </div>
      </div>
      <p className="mt-4 text-gray-hot">About ﹒ Help ﹒ API</p>
      <p className="mt-4 font-bold">@Copyright OUTSTAGRAM from METAL</p>
    </>
  );
}
