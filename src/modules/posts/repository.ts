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
//  [newPost] is just array destructuring to get row 1 directly.
// Look up the internal users.id using auth0_id from JWT, then create the post.
// SELECT lets us derive user_id from users table in one query.
// If no row is returned, there was no matching user for the token subject.

export async function createNewPost(title: string, content: string, auth0_id: string) {
 
  const [newPost] = await db`
    INSERT INTO posts (title, content, user_id)
   
    SELECT ${title}, ${content}, u.id
    FROM users u
    WHERE u.auth0_id = ${auth0_id}
    RETURNING id, title, content, user_id, created_at
  `;

  if (!newPost) {
    throw new Error("User not found. Failed to create new post");
  }

  return newPost;
}
