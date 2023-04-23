import { parseDate } from '@/util/date';
import PostIcon from './ui/icons/PostIcon';
import ToggleIcon from './ui/ToggleIcon';
import { Comment, SimplePost } from '@/model/posts';
import usePosts from '@/hooks/posts';
import useMe from '@/hooks/me';
import CommentForm from './CommentForm';

type Props = {
  post: SimplePost;
  children?: React.ReactNode;
  onComment: (comment: Comment) => void;
};

export default function ActionBar({ post, children, onComment }: Props) {
  const { id: postId, likes, username, text, createdAt } = post;
  const { user, setBookmark } = useMe();
  const { setLike } = usePosts();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user ? user.bookmarks.includes(postId) : false;

  const handleLike = (like: boolean) => {
    user && setLike(post, like, user.username);
  };

  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(postId, bookmark);
  };

  const handleComment = (comment: string) => {
    user && onComment({ comment, username: user.username, image: user.image });
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
          onToggle={handleBookmark}
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
        {children}
        <p className="my-1 text-sm text-gray-hot">{parseDate(createdAt)}</p>
      </div>
      <CommentForm onPostComment={handleComment} />
    </>
  );
}
