import db from "../../db";

export async function getAllPosts() {
  const posts = await db`
    SELECT id, user_id, title, content, created_at
    FROM posts
    ORDER BY created_at DESC`;
  return posts;
}
  
export async function findPostById(postId: number) {
  const [post] = await db`
    SELECT id, title, content, created_at
    FROM posts
    WHERE id = ${postId}
  `;

  return post ?? null;
}

export async function getPostsByUserId(userId: number) {
  const posts = await db`
    SELECT id, title, content, created_at
    FROM posts
    WHERE user_id = ${userId}
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

) {
  const [row] = await db`
    UPDATE posts p
    SET title = ${title}, content = ${content}
    FROM users u
    WHERE p.id = ${postId}
      AND p.user_id = u.id
    RETURNING p.id, p.title, p.content, p.user_id, p.created_at
  `;
  return row ?? null;
}

export async function deletePostById(postId: number) {
const rows = await db`
    DELETE FROM posts
    WHERE id = ${postId}
    RETURNING id
  `;
  return Array.isArray(rows) && rows.length > 0;
}
