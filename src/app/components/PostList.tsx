'use client';
import { SimplePost } from '@/model/posts';
import useSWR from 'swr';
import PostCard from './PostCard';
import GridSpinner from './ui/GridSpinner';

export default function PostList() {
  const { data: posts, isLoading } = useSWR<SimplePost[]>('/api/posts');

  return (
    <section>
      {isLoading && (
        <div className="text-center mt-32">
          <GridSpinner />
        </div>
      )}
      <ul>
        {posts &&
          posts.map((post, idx) => (
            <li key={post.id} className="mb-4">
              <PostCard post={post} priority={idx < 2}></PostCard>
            </li>
          ))}
      </ul>
    </section>
  );
}
