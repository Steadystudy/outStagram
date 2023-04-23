'use client';

import { Comment, SimplePost } from '@/model/posts';
import Image from 'next/image';
import ActionBar from './ActionBar';
import { useState } from 'react';
import ModalPortal from './ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';
import PostUserAvatar from './PostUserAvatar';
import { signIn, useSession } from 'next-auth/react';
import usePosts from '@/hooks/posts';

type Props = {
  post: SimplePost;
  priority: boolean;
};

export default function PostCard({ post, priority }: Props) {
  const { username, userImage, image, comments } = post;
  const [openModal, setOpenModal] = useState(false);
  const { data: session } = useSession();
  const { postComment } = usePosts();
  const handlePostComment = (comment: Comment) => {
    postComment(post, comment);
  };

  const handleOpenPost = () => {
    if (!session?.user) {
      return signIn();
    }
    setOpenModal(true);
  };

  return (
    <article className="bg-white border shadow-md round-lg border-gray-light">
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post}></PostDetail>
          </PostModal>
        </ModalPortal>
      )}
      <PostUserAvatar userImage={userImage} username={username} />
      <Image
        className="w-full object-cover aspect-auto border-y-2 border-gray-light max-h-[500px]"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={handleOpenPost}
      />
      <ActionBar post={post} onComment={handlePostComment}>
        {comments > 1 && (
          <button
            className="my-2 font-bold text-sky-500"
            onClick={() => setOpenModal(true)}
          >{`View all ${comments} comments`}</button>
        )}
      </ActionBar>
    </article>
  );
}
