import db from "../../db";

export async function getAllComments() {
  const comments = await db`SELECT * FROM comments`;
  return comments;
}

export async function createNewComment(comment: string, post_id: number, auth0_id: string) {
  const [newComment] = await db`
    INSERT INTO comments (post_id, user_id, comment)
    SELECT p.id, u.id, ${comment}
    FROM users u
    JOIN posts p ON p.id = ${post_id}
    WHERE u.auth0_id = ${auth0_id}
    RETURNING id, post_id, user_id, comment, created_at
  `;

  return newComment ?? null;
}

export async function getCommentPerPost(postId: number) {
  const comments = await db`
    SELECT id, post_id, user_id, comment, created_at
    FROM comments
    WHERE post_id = ${postId}
    ORDER BY created_at DESC
  `;
  return comments;
}

export async function deleteCommentById(commentId: number) {
const rows = await db`
    DELETE FROM comments
    WHERE id = ${commentId}
    RETURNING id
  `;
  return Array.isArray(rows) && rows.length > 0;
}
  