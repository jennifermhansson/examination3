import db from "../../db";

export async function upsertUser(user: {
  auth0_id: string;
  email?: string | null;
  name?: string | null;
}) {
  const [newUser] = await db`
    INSERT INTO users (auth0_id, email, name)
    VALUES (${user.auth0_id}, ${user.email ?? null}, ${user.name ?? null})
    ON CONFLICT (auth0_id)
    DO UPDATE SET
      email = COALESCE(EXCLUDED.email, users.email),
      name = COALESCE(EXCLUDED.name, users.name)
    RETURNING *
  `;

  return newUser ?? null;
}

export async function isAdmin(auth0Id: string): Promise<boolean> {
  const [user] = await db`SELECT role FROM users WHERE auth0_id = ${auth0Id}`;
  return user?.role === "admin";
}

export async function deleteUserById(userId: number) {
  const [deletedUser] = await db`
    DELETE FROM users
    WHERE id = ${userId}
    RETURNING *
  `;

  return deletedUser ?? null;
}