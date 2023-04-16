import { DetailUser, OAuthUser } from '@/model/user';
import { client, urlFor } from './sanity';

export async function addUser({ id, email, name, image, username }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    username,
    email,
    name,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByUsername(username: string) {
  return client
    .fetch(
      `*[_type=="user" && username=="${username}"][0]{
    ...,
    "id": _id,
    following[]->{username, image},
    followers[]->{username, image},
    "bookmarks":bookmarks[]->_id,
  }`,
    )
    .then((user: DetailUser) => ({
      ...user,
      followers: user.followers.map((follower) => ({
        ...follower,
        image: urlFor(follower.image || ''),
      })),
      following: user.following.map((follow) => ({
        ...follow,
        image: urlFor(follow.image || ''),
      })),
    }));
}

export async function searchUser(keyword?: string) {
  const query = keyword ? `&& (name match "${keyword}" || username match "${keyword}")` : '';

  return client
    .fetch(
      `*[_type == "user" ${query}]{
      ...,
      "following": count(following),
      "followers": count(followers),
    }`,
    )
    .then((users: DetailUser[]) =>
      users.map((user) => ({
        ...user,
        image: urlFor(user.image || ''),
      })),
    );
}
