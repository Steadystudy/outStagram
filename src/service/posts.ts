import { Comment, SimplePost } from '@/model/posts';
import { accessURL, client, urlFor } from './sanity';

const simplePostProjection = `
  ...,
  "username": author -> username,
  "userImage": author -> image,
  "image": photo,
  "likes": likes[]-> username,
  "text": comments[0].comment,
  "comments": count(comments),
  "id": _id,
  "createdAt": _createdAt
`;

function mapPosts(posts: SimplePost[]) {
  return posts.map((post) => ({
    ...post,
    likes: post.likes ?? [],
    image: urlFor(post.image),
    userImage: urlFor(post.userImage),
  }));
}

export async function getFollowingPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"
  || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
  | order(_createdAt desc){${simplePostProjection}}`,
    )
    .then(mapPosts);
}

export async function getPost(id: string) {
  return client
    .fetch(
      `*[_type == "post" && _id == "${id}"][0]{
        ...,
        "username": author -> username,
        "userImage": author -> image,
        "image": photo,
        "likes": likes[] -> username,
        comments[]{comment, "username": author->username, "image": author->image},
        "id": _id,
        "createdAt": _createdAt
      }`,
    )
    .then((post) => ({
      ...post,
      image: urlFor(post.image),
      userImage: urlFor(post.userImage),
      comments: post.comments.map((comment: Comment) => ({
        ...comment,
        image: urlFor(comment.image || ''),
      })),
    }));
}

export async function getPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"]
      | order(_createdAt desc) {
        ${simplePostProjection}
      }
    `,
    )
    .then(mapPosts);
}

export async function getLikedOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && "${username}" in likes[]->username]
      | order(_createdAt desc) {
        ${simplePostProjection}
      }
    `,
    )
    .then(mapPosts);
}

export async function getSavedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && _id in *[_type == "user" && username=="${username}"][0].bookmarks[]._ref]
      | order(_createdAt desc) {
        ${simplePostProjection}
      }
    `,
    )
    .then(mapPosts);
}

export async function likePost(postId: string, userId: string) {
  return client
    .patch(postId) //
    .setIfMissing({ likes: [] })
    .append('likes', [
      {
        _ref: userId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function dislikePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit();
}

export async function addComment(postId: string, userId: string, comment: string) {
  return client
    .patch(postId) //
    .setIfMissing({ comments: [] })
    .append('comments', [
      {
        comment,
        author: { _ref: userId, _type: 'reference' },
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function createPost(userId: string, text: string, file: Blob) {
  // Refactor: 추후 sanity에서 Next 13 버전 Route Handler 지원되면 바꿔야함
  return fetch(accessURL, {
    method: 'POST',
    headers: {
      'content-type': file.type,
      authorization: `Bearer ${process.env.SANITY_SECRET_TOKEN}`,
    },
    body: file,
  })
    .then((res) => res.json())
    .then((result) => {
      return client.create(
        {
          _type: 'post',
          author: { _ref: userId },
          photo: { asset: { _ref: result.document._id } },
          comments: [
            {
              commnet: text,
              author: { _ref: userId, _type: 'reference' },
            },
          ],
          likes: [],
        },
        { autoGenerateArrayKeys: true },
      );
    });
}
