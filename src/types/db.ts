export type User = {
  id: number;
  auth0_id: string;
  email: string | null;
  name: string | null;
  role: string;
  created_at: string;
};

export type Post = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
};

export type Comment = {
  id: number;
  post_id: number;
  user_id: number;
  comment: string;
  created_at: string;
};