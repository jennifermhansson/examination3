import db from "../../db";

export async function getAllPosts() {
  const posts = await db`SELECT * FROM posts`;
  return posts;
}
  

export async function getPostById(id: number) {
  const post = await db`
    SELECT id, title, content, created_at
    FROM posts
    WHERE id = ${id}
  `;

  return post[0] ?? null;
}

export async function createNewPost() {
    const newPost = await db`
    INSERT INTO posts (title, content)
    VALUES ($1, $2)
    RETURNING id, title, content, created_at`

    return newPost
}
