'use client';
import { parseDate } from '@/util/date';
import PostIcon from './ui/icons/PostIcon';
import { useState } from 'react';
import ToggleIcon from './ui/ToggleIcon';
import { SimplePost } from '@/model/posts';
import { useSession } from 'next-auth/react';
import { useSWRConfig } from 'swr';

type Props = {
  post: SimplePost;
};

export default function ActionBar({ post }: Props) {
  const { id, likes, username, text, createdAt } = post;
  const { data: session } = useSession();
  const user = session?.user;
  const liked = user ? likes.includes(user.username) : false;
  const [bookmarked, setBookmarked] = useState(false);
  const { mutate } = useSWRConfig();
  const handleLike = (like: boolean) => {
    fetch('api/likes', {
      method: 'PUT',
      body: JSON.stringify({ id, like }),
    }).then(() => mutate('/api/posts'));
  };

  return (
    <>
      <div className="flex justify-between px-4 my-2">
        <ToggleIcon
          toggled={liked}
          onToggle={handleLike}
          onIcon={PostIcon('heartFill')}
          offIcon={PostIcon('heart')}
        />
        <ToggleIcon
          toggled={bookmarked}
          onToggle={setBookmarked}
          onIcon={PostIcon('bookmarkFill')}
          offIcon={PostIcon('bookmark')}
        />
      </div>
      <div className="px-4 py-1">
        <p className="mb-2 font-bold">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? 'likes' : 'like'
        }`}</p>
        {text && (
          <p>
            <span className="mr-2 font-bold">{username}</span>
            {text}
          </p>
        )}
        <p className="my-1 text-sm text-gray-hot">{parseDate(createdAt)}</p>
      </div>
    </>
  );
}
