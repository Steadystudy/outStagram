export type Comment = {
  author: string;
};

export type SimplePost = Omit<FullPost, 'comments'> & {
  comments: number;
};

export type FullPost = {
  id: string;
  username: string;
  userImage: string;
  image: string;
  likes: string[];
  comments: Comment[];
  text: string;
  createdAt: string;
};
