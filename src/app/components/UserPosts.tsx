'use client';

import { ProfileUser } from '@/model/user';
import { useState } from 'react';
import PostGrid from './PostGrid';
import { CacheKeysContext } from '@/context/CacheKeysContext';

type Props = {
  user: ProfileUser;
};

const tabs = [{ type: 'posts' }, { type: 'liked' }, { type: 'saved' }];
export default function UserPosts({ user }: Props) {
  const { username } = user;

  const [tab, setTab] = useState(tabs[0].type);

  return (
    <section>
      <ul className="flex justify-center uppercase">
        {tabs.map(({ type }) => (
          <li
            className={`mx-12 my-4 cursor-pointer border-b-gray-hot ${
              tab === type && 'border-t font-bold'
            }`}
            key={type}
            onClick={() => {
              setTab(type);
            }}
          >
            <span>{type}</span>
          </li>
        ))}
      </ul>
      <CacheKeysContext.Provider value={{ postsKey: `/api/users/${username}/${tab}` }}>
        <PostGrid />
      </CacheKeysContext.Provider>
    </section>
  );
}
