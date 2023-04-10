import { User } from '@/model/user';
import Avatar from './Avatar';

export default function Sidebar({ user: { image, username, name } }: { user: User }) {
  return (
    <section>
      <div>
        {image && <Avatar border={false} size="md" image={image} />}
        <div>
          <h3>{username}</h3>
          <p>{name}</p>
        </div>
      </div>
      <p>About ﹒ Help ﹒ API</p>
      <p>@Copyright OUTSTAGRAM from METAL</p>
    </section>
  );
}
