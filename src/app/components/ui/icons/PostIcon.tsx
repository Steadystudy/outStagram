import React from 'react';
import { AiOutlineHeart, AiFillHeart, AiOutlineSmile } from 'react-icons/ai';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { RiSearchFill } from 'react-icons/ri';

type Props = 'heart' | 'heartFill' | 'bookmark' | 'bookmarkFill' | 'smile';

const ICON_STYLE = `text-2xl text-pink-hot`;

export default function PostIcon(name: Props) {
  switch (name) {
    case 'heart':
      return <AiOutlineHeart className={ICON_STYLE} />;
    case 'heartFill':
      return <AiFillHeart className={ICON_STYLE} />;
    case 'bookmark':
      return <BsBookmark className={ICON_STYLE} />;
    case 'bookmarkFill':
      return <BsFillBookmarkFill className={ICON_STYLE} />;
    case 'smile':
      return <AiOutlineSmile className={ICON_STYLE} />;
    default:
      return;
  }
}
