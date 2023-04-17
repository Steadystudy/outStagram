import { Comment, SimplePost } from '@/model/posts';
import { client, urlFor } from './sanity';

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
        image: urlFor(comment.image),
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
