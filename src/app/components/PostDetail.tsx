import { FullPost, SimplePost } from '@/model/posts';
import Image from 'next/image';
import useSWR from 'swr';
import PostUserAvatar from './PostUserAvatar';
import ActionBar from './ActionBar';
import CommentForm from './CommentForm';

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image, createdAt, likes } = post;
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;

  return (
    <section className="flex">
      <div className="relative">
        <Image
          src={image}
          alt={`photo by ${username}`}
          priority
          width={500}
          height={650}
          className="object-cover"
        />
      </div>
      <div>
        <PostUserAvatar userImage={userImage} username={username} />
        <ul>
          {comments?.map((comment) => (
            <li key={id}>{comment.comment}</li>
          ))}
        </ul>
        <ActionBar likes={likes} username={username} createdAt={createdAt} />
        <CommentForm />
      </div>
    </section>
  );
}
