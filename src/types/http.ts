export type CreatePostBody = {
  title: string;
  content: string;
};

export type EditPostBody = {
  title: string;
  content: string;
};

export type EditPostParams = {
  id: string;
};

export type CreateCommentBody = {
  comment: string;
};

export type EditCommentBody = {
  comment: string;
};

export type EditCommentParams = {
  id: string;
};

export type DeleteUserParams = {
  id: string;
};
