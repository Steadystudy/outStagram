'use client';

import { SimplePost } from '@/model/posts';
import Avatar from './Avatar';
import Image from 'next/image';
import CommentForm from './CommentForm';
import ActionBar from './ActionBar';
import { useState } from 'react';
import ModalPortal from './ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';
import PostUserAvatar from './PostUserAvatar';
import { signIn, useSession } from 'next-auth/react';

type Props = {
  post: SimplePost;
  priority: boolean;
};

export default function PostCard({ post, priority }: Props) {
  const { username, userImage, image } = post;
  const [openModal, setOpenModal] = useState(false);
  const { data: session } = useSession();

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
      <ActionBar post={post} />
      <CommentForm />
    </article>
  );
}
