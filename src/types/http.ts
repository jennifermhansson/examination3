
export type CreatePostBody = {
  title: string;
  content: string;
};

export type CreateCommentBody = {
  comment: string;
};

export type EditPostParams = { 
  id: string 
};

export type EditPostBody = { 
  title: string; 
  content: string 
};

export type EditCommentParams = { 
  id: string 
};

export type EditCommentBody = { 
  comment: string;
  
};

