import useSWR from 'swr';
import GridSpinner from './ui/GridSpinner';
import { SimplePost } from '@/model/posts';
import PostGridCard from './PostGridCard';

type Props = {
  username: string;
  query: string;
};

export default function PostGrid({ username, query }: Props) {
  const { data: posts, isLoading } = useSWR<SimplePost[]>(`/api/users/${username}/${query}`);

  return (
    <div>
      {isLoading && <GridSpinner />}
      <ul className="grid grid-cols-3 gap-4 py-4 px-8">
        {posts &&
          posts.map((post, idx) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={idx < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}