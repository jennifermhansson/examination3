import db from "../../db";

export async function getAllPosts() {
  const posts = await db`
      SELECT 
      p.id,
      p.user_id,
      u.name AS post_author_name,
      p.title,
      p.content,
      p.created_at,
      COUNT(c.id) AS comment_count
    FROM posts p
    JOIN users u ON p.user_id = u.id
    LEFT JOIN comments c ON p.id = c.post_id
    GROUP BY p.id, u.name
    ORDER BY p.created_at DESC`;
  return posts;
}
  
export async function findPostById(postId: number) {
  const [post] = await db`
    SELECT
      p.id,
      p.user_id,
      u.name AS post_author_name,
      p.title,
      p.content,
      p.created_at,
      COUNT(c.id) AS comment_count
    FROM posts p
    JOIN users u ON p.user_id = u.id
    LEFT JOIN comments c ON p.id = c.post_id
    WHERE p.id = ${postId}
    GROUP BY p.id, u.name
  `;

  return post ?? null
}

export async function getPostsByUserId(userId: number) {
  const posts = await db`
    SELECT
      p.id,
      p.user_id,
      u.name AS post_author_name,
      p.title,
      p.content,
      p.created_at,
      COUNT(c.id) AS comment_count
    FROM posts p
    JOIN users u ON p.user_id = u.id
    LEFT JOIN comments c ON p.id = c.post_id
    WHERE p.user_id = ${userId}
    GROUP BY p.id, u.name
    ORDER BY p.created_at DESC
  `;

  return posts;
}

export async function createNewPost(title: string, content: string, auth0_id: string) {
 
  const [newPost] = await db`
    INSERT INTO posts (title, content, user_id)
   
    SELECT ${title}, ${content}, u.id
    FROM users u
    WHERE u.auth0_id = ${auth0_id}
    RETURNING id, title, content, user_id, created_at
  `;

  return newPost ?? null;
}

export async function updatePostByIdForUser(
  postId: number,
  title: string,
  content: string,
  auth0_id: string,
) {
  const [row] = await db`
    UPDATE posts p
    SET title = ${title}, content = ${content}
    FROM users u
    WHERE p.id = ${postId}
      AND p.user_id = u.id
      AND u.auth0_id = ${auth0_id}
    RETURNING p.id, p.title, p.content, p.user_id, p.created_at
  `;
  return row ?? null;
}

export async function deletePostById(postId: number, auth0_id: string) {
const rows = await db`
    DELETE FROM posts p
    USING users u
    WHERE p.id = ${postId}
      AND p.user_id = u.id
      AND u.auth0_id = ${auth0_id}
    RETURNING p.id
  `;
  return Array.isArray(rows) && rows.length > 0;
}
