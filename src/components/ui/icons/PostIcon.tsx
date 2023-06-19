import React from 'react';
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineSmile,
  AiOutlineCloseSquare,
  AiOutlineFile,
  AiFillFile,
} from 'react-icons/ai';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';

type Props =
  | 'heart'
  | 'heartFill'
  | 'bookmark'
  | 'bookmarkFill'
  | 'smile'
  | 'close'
  | 'post'
  | 'postFill'
  | string;

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
    case 'post':
      return <AiOutlineFile className={ICON_STYLE} />;
    case 'postFill':
      return <AiFillFile className={ICON_STYLE} />;
    case 'smile':
      return <AiOutlineSmile className={ICON_STYLE} />;
    case 'close':
      return <AiOutlineCloseSquare className="text-5xl text-pink-light" />;
    default:
      return;
  }
}
