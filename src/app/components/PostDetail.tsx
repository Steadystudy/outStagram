import { SimplePost } from '@/model/posts';
import Image from 'next/image';
import PostUserAvatar from './PostUserAvatar';
import ActionBar from './ActionBar';
import Avatar from './Avatar';
import useFullPost from '@/hooks/post';

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image } = post;
  const { post: data, postComment } = useFullPost(id);
  const comments = data?.comments;

  return (
    <section className="flex w-full h-full">
      <div className="relative basis-3/5">
        <Image src={image} alt={`photo by ${username}`} priority fill sizes="600px" />
      </div>
      <div className="flex flex-col basis-2/5">
        <PostUserAvatar userImage={userImage} username={username} />
        <ul className="h-full p-4 mb-1 overflow-y-auto border-y border-gray-light">
          {comments?.map(({ image: commentUserImage, username: commentUsername, comment }, idx) => (
            <li key={commentUsername + idx}>
              <Avatar image={commentUserImage} size="sm" border={commentUsername === username} />
              <div className="ml-2">
                <span className="mr-1 font-bold">{commentUsername}</span>
                <span>{comment}</span>
              </div>
            </li>
          ))}
        </ul>
        <ActionBar post={post} onComment={postComment} />
      </div>
    </section>
  );
}
