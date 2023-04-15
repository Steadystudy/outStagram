import { SimplePost } from '@/model/posts';
import Avatar from './Avatar';
import Image from 'next/image';
import CommentForm from './CommentForm';
import ActionBar from './ActionBar';

type Props = {
  post: SimplePost;
  priority: boolean;
};

export default function PostCard({ post, priority }: Props) {
  const { username, userImage, createdAt, image, text, likes } = post;

  return (
    <article className="round-lg shadow-md border border-gray-light">
      <div className="flex items-center p-2">
        <Avatar image={userImage} size="md" />
        <span className="font-bold">{username}</span>
      </div>
      <Image
        className="w-full object-cover aspect-auto border-y-2 border-gray-light max-h-[500px]"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
      />
      <ActionBar likes={likes} username={username} text={text} createdAt={createdAt} />
      <CommentForm />
    </article>
  );
}
