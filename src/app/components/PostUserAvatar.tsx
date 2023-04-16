import React from 'react';
import Avatar from './Avatar';

type Props = {
  username: string;
  userImage: string;
};

export default function PostUserAvatar({ userImage, username }: Props) {
  return (
    <div className="flex items-center p-2 gap-2">
      <Avatar image={userImage} size="md" />
      <span className="font-bold">{username}</span>
    </div>
  );
}
