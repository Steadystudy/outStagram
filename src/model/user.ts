export type User = {
  name: string;
  username: string;
  email: string;
  image?: string;
};

export type OAuthUser = User & {
  id: string;
};

export type SimpleUser = Pick<User, 'username' | 'image'>;

export type DetailUser = User & {
  id: string;
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string;
};
