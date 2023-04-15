import { SimplePost } from '@/model/posts';
import Avatar from './Avatar';
import PostIcon from './ui/icons/PostIcon';
import Image from 'next/image';
import { parseDate } from '@/util/date';

export default function PostCard({ post }: { post: SimplePost }) {
  const { username, userImage, createdAt, image, text, likes } = post;

  return (
    <article className="round-lg shadow-md border border-gray-light">
      <div className="flex items-center p-2">
        <Avatar image={userImage} size="md" />
        <span className="font-bold">{username}</span>
      </div>
      <Image src={image} alt={`photo by ${username}`} width={500} height={500} />
      <div>
        {PostIcon('heart')}
        {PostIcon('bookmark')}
      </div>
      <div>
        <p>{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}</p>
        <p>
          <span>{username}</span>
          {text}
        </p>
        <p>{parseDate(createdAt)}</p>
      </div>
      <form>
        {PostIcon('smile')}
        <input type="text" placeholder="Comment" />
        <button>POST</button>
      </form>
    </article>
  );
}
