import React from 'react';
import { AiOutlineHome, AiOutlineSearch, AiFillHome } from 'react-icons/ai';
import { BsPlusCircle, BsPlusCircleFill } from 'react-icons/bs';
import { RiSearchFill } from 'react-icons/ri';

type Props = 'home' | 'homeFill' | 'search' | 'searchFill' | 'new' | 'newFill';

export default function NavIcon(name: Props) {
  switch (name) {
    case 'home':
      return <AiOutlineHome />;
    case 'homeFill':
      return <AiFillHome />;
    case 'search':
      return <AiOutlineSearch />;
    case 'searchFill':
      return <RiSearchFill />;
    case 'new':
      return <BsPlusCircle />;
    case 'newFill':
      return <BsPlusCircleFill />;
    default:
      return;
  }
}
