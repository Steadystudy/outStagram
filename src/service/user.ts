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
    "id":_id,
    following[]->{"id":_id, username, image},
    followers[]->{"id":_id, username, image},
    "bookmarks":bookmarks[]->_id,
  }`,
    )
    .then((user: DetailUser) => ({
      ...user,
      image: urlFor(user.image || ''),
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
      "id":_id,
      "following": count(following),
      "followers": count(followers),
    }`,
    )
    .then((users: DetailUser[]) =>
      users.map((user) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
        image: urlFor(user.image || ''),
      })),
    );
}

export async function getUserForProfile(username: string) {
  return client
    .fetch(
      `*[_type=="user" && username == "${username}"][0]{
      ...,
      "id":_id,
      "following": count(following),
      "followers": count(followers),
      "posts": count(*[_type=="post" && author->username == "${username}"])
    }
    `,
    )
    .then((user) => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
      image: urlFor(user.image),
    }));
}

export async function addBookmark(userId: string, postId: string) {
  return client
    .patch(userId) //
    .setIfMissing({ bookmarks: [] })
    .append('bookmarks', [
      {
        _ref: postId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}

export async function follow(myId: string, targetId: string) {
  return client
    .transaction()
    .patch(myId, (user) =>
      user
        .setIfMissing({ following: [] })
        .append('following', [{ _ref: targetId, _type: 'reference' }]),
    )
    .patch(targetId, (user) =>
      user
        .setIfMissing({ followers: [] })
        .append('followers', [{ _ref: myId, _type: 'reference' }]),
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(myId: string, targetId: string) {
  return client
    .transaction()
    .patch(myId, (user) => user.unset([`following[_ref=="${targetId}"]`]))
    .patch(targetId, (user) => user.unset([`followers[_ref=="${myId}"]`]))
    .commit({ autoGenerateArrayKeys: true });
}
