import PostIcon from './ui/icons/PostIcon';

export default function CommentForm() {
  return (
    <form className="flex items-center border-t px-4 border-gray-light">
      {PostIcon('smile')}
      <input
        className="w-full ml-2 p-4 border-none outline-none"
        type="text"
        placeholder="Add a comment"
      />
      <button>POST</button>
    </form>
  );
}
