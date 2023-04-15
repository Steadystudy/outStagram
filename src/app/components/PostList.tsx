'use client';
import { SimplePost } from '@/model/posts';
import useSWR from 'swr';
import PostCard from './PostCard';

export default function PostList() {
  const { data: posts, isLoading } = useSWR<SimplePost[]>('/api/posts');

  return (
    <section>
      {isLoading && <div></div>}
      <ul>
        {posts &&
          posts.map((post) => (
            <li key={post.id}>
              <PostCard post={post}></PostCard>
            </li>
          ))}
      </ul>
    </section>
  );
}
