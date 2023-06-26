import { useCacheKeys } from '@/context/CacheKeysContext';
import { Comment, SimplePost } from '@/model/posts';
import { useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';

async function updateLike(id: string, like: boolean) {
  return fetch('/api/likes', {
    method: 'PUT',
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

async function addComment(id: string, comment: string) {
  return fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

async function deletePost(id: string): Promise<any> {
  return fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });
}

export default function usePosts() {
  const cacheKeys = useCacheKeys();
  const { data: posts, isLoading, error, mutate } = useSWR<SimplePost[]>(cacheKeys.postsKey);

  const setLike = useCallback(
    (post: SimplePost, like: boolean, username: string) => {
      const newPost = {
        ...post,
        likes: like ? [...post.likes, username] : post.likes.filter((item) => item !== username),
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      return mutate(updateLike(post.id, like), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate],
  );

  const postComment = useCallback(
    (post: SimplePost, comment: Comment) => {
      const newPost = {
        ...post,
        comments: post.comments + 1,
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate],
  );

  const removeSpecificPost = useCallback(
    (postId: string) => {
      const newPosts = posts?.filter((p) => p.id !== postId);

      return mutate(deletePost(postId), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: true,
        rollbackOnError: true,
      });
    },
    [posts, mutate],
  );

  return { posts, isLoading, error, setLike, postComment, removeSpecificPost };
}
