import db from "../../db";

export async function getAllPosts() {
  const posts = await db`
    SELECT id, title, content, created_at
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
