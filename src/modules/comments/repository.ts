import db from "../../db";

export async function getAllComments() {
  const comments = await db`SELECT * FROM comments`;
  return comments;
}
  