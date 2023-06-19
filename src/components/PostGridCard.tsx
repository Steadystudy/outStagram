import { SimplePost } from '@/model/posts';
import Image from 'next/image';
import ModalPortal from './ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';
import { useState } from 'react';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostGridCard({ post, priority = false }: Props) {
  const { image, username } = post;
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="w-full relative aspect-square">
      <Image
        className="object-cover"
        src={image}
        alt={`photo by ${username}`}
        priority={priority}
        fill
        sizes="650px"
        onClick={() => {
          setOpenModal(true);
        }}
      />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post}></PostDetail>
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
}
