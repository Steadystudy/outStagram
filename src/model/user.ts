export type OAuthUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string;
};

export type SimpleUser = Pick<OAuthUser, 'id' | 'username' | 'image'>;

export type DetailUser = OAuthUser & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};

export type ProfileUser = OAuthUser & {
  following: number;
  followers: number;
  posts: number;
};
