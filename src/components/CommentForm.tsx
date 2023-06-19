import { FormEvent, useState } from 'react';
import PostIcon from './ui/icons/PostIcon';

type Props = {
  onPostComment: (comment: string) => void;
};

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState('');
  const buttonDisabled = comment.length === 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center px-4 border-t border-gray-light">
      {PostIcon('smile')}
      <input
        className="w-full p-4 ml-2 border-none outline-none"
        type="text"
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button
        disabled={buttonDisabled}
        className={`font-bold ${buttonDisabled ? 'text-sky-300' : 'text-sky-500'}`}
      >
        POST
      </button>
    </form>
  );
}
