'use client';

import { ProfileUser } from '@/model/user';
import { useState } from 'react';
import PostGrid from './PostGrid';
import { CacheKeysContext } from '@/context/CacheKeysContext';
import PostIcon from './ui/icons/PostIcon';

type Props = {
  user: ProfileUser;
};

const tabs = [
  { type: 'posts', baseIcon: 'post', clickedIcon: 'postFill' },
  { type: 'liked', baseIcon: 'heart', clickedIcon: 'heartFill' },
  { type: 'saved', baseIcon: 'bookmark', clickedIcon: 'bookmarkFill' },
];
export default function UserPosts({ user }: Props) {
  const { username } = user;

  const [tab, setTab] = useState(tabs[0].type);

  return (
    <section>
      <ul className="flex justify-center uppercase">
        {tabs.map(({ type, baseIcon, clickedIcon }) => (
          <li
            className={`mx-12 my-4 cursor-pointer`}
            key={type}
            onClick={() => {
              setTab(type);
            }}
          >
            {tab === type ? PostIcon(clickedIcon) : PostIcon(baseIcon)}
          </li>
        ))}
      </ul>
      <CacheKeysContext.Provider value={{ postsKey: `/api/users/${username}/${tab}` }}>
        <PostGrid />
      </CacheKeysContext.Provider>
    </section>
  );
}
