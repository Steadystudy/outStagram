'use client';
import PostCard from './PostCard';
import GridSpinner from './ui/GridSpinner';
import usePosts from '@/hooks/posts';

export default function PostList() {
  const { posts, isLoading } = usePosts();

  return (
    <section>
      {isLoading && (
        <div className="mt-32 text-center">
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
