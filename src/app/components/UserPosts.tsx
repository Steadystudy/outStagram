'use client';

import { ProfileUser } from '@/model/user';
import { useState } from 'react';
import PostGrid from './PostGrid';

type Props = {
  user: ProfileUser;
};

const tabs = [{ type: 'posts' }, { type: 'liked' }, { type: 'saved' }];
export default function UserPosts({ user }: Props) {
  const { image, username, name, followers, following, posts } = user;

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
      <PostGrid username={username} query={tab} />
    </section>
  );
}
