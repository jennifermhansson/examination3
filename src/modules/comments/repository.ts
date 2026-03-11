import db from '../../db';

export async function getAllComments() {
  const comments = await db`   
    SELECT
       c.id,
      c.post_id,
      p.user_id AS post_author_id,
      pu.name AS post_author_name,
      c.user_id AS comment_author_id,
      cu.name AS comment_author_name,
      c.comment,
      c.created_at
    FROM comments c
    JOIN posts p ON c.post_id = p.id
    JOIN users cu ON c.user_id = cu.id
    JOIN users pu ON p.user_id = pu.id
    ORDER BY created_at DESC`;
  return comments;
}

export async function createNewComment(
  comment: string,
  post_id: number,
  auth0_id: string,
) {
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

export async function getCommentsForPostId(postId: number) {
  const comments = await db`
    SELECT
      c.id,
      c.post_id,
      p.user_id AS post_author_id,
      pu.name AS post_author, 
      c.user_id AS comment_author_id,
      cu.name AS comment_author_name,
      c.comment,
      c.created_at
    FROM comments c
    JOIN posts p ON c.post_id = p.id
    JOIN users cu ON c.user_id = cu.id
    JOIN users pu ON p.user_id = pu.id
    WHERE c.post_id = ${postId}
    ORDER BY c.created_at DESC
  `;
  return comments;
}

export async function updateCommentByIdForUser(
  commentId: number,
  comment: string,
  auth0_id: string,
) {
  const [row] = await db`
    UPDATE comments c
    SET comment = ${comment}
    FROM users u
    WHERE c.id = ${commentId}
      AND c.user_id = u.id
      AND u.auth0_id = ${auth0_id}
    RETURNING c.id, c.post_id, c.user_id, c.comment, c.created_at
  `;
  return row ?? null;
}

export async function findCommentById(commentId: number) {
  const [comment] = await db`
    SELECT id, post_id, user_id, comment, created_at
    FROM comments
    WHERE id = ${commentId}
  `;

  return comment ?? null;
}

export async function deleteCommentById(commentId: number, auth0_id: string) {
  const rows = await db`
    DELETE FROM comments c
    USING users u
    WHERE c.id = ${commentId}
      AND c.user_id = u.id
      AND u.auth0_id = ${auth0_id}
    RETURNING c.id
  `;
  return Array.isArray(rows) && rows.length > 0;
}
