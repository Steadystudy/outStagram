import React from 'react';
import { AiOutlineHome, AiOutlineSearch, AiFillHome } from 'react-icons/ai';
import { BsPlusCircle, BsPlusCircleFill } from 'react-icons/bs';
import { RiSearchFill } from 'react-icons/ri';

type Props = 'home' | 'homeFill' | 'search' | 'searchFill' | 'new' | 'newFill';

const ICON_STYLE = `text-2xl text-pink-hot`;

export default function NavIcon(name: Props) {
  switch (name) {
    case 'home':
      return <AiOutlineHome className={ICON_STYLE} />;
    case 'homeFill':
      return <AiFillHome className={ICON_STYLE} />;
    case 'search':
      return <AiOutlineSearch className={ICON_STYLE} />;
    case 'searchFill':
      return <RiSearchFill className={ICON_STYLE} />;
    case 'new':
      return <BsPlusCircle className={ICON_STYLE} />;
    case 'newFill':
      return <BsPlusCircleFill className={ICON_STYLE} />;
    default:
      return;
  }
}
