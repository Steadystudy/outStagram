import { parseDate } from '@/util/date';
import PostIcon from './ui/icons/PostIcon';

type Props = {
  likes: string[];
  username: string;
  text?: string;
  createdAt: string;
};

export default function ActionBar({ likes, username, text, createdAt }: Props) {
  return (
    <>
      <div className="flex justify-between my-2 px-4">
        {PostIcon('heart')}
        {PostIcon('bookmark')}
      </div>
      <div className="px-4 py-1">
        <p className="font-bold mb-2">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? 'likes' : 'like'
        }`}</p>
        {text && (
          <p>
            <span className="font-bold mr-2">{username}</span>
            {text}
          </p>
        )}
        <p className="text-sm text-gray-hot">{parseDate(createdAt)}</p>
      </div>
    </>
  );
}
