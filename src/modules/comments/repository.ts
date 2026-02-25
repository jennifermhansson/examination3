import db from "../../db";

export async function getAllComments() {
  const comments = await db`SELECT * FROM comments`;
  return comments;
}

export async function createNewComment() {
  const newComment = await db
  `INSERT INTO comments (title, content)
  VALUES ($1, $2)
  RETURNING id, title, content, created_at`;
  return newComment;
}
  