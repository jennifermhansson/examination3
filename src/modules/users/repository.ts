import db from "../../db";

export async function upsertUser(user: {
  auth0_id: string;
  email?: string | null;
  name?: string | null;
}) {
  const newUser = await db`
    INSERT INTO users (auth0_id, email, name)
    VALUES (${user.auth0_id}, ${user.email ?? null}, ${user.name ?? null})
    ON CONFLICT (auth0_id)
    DO UPDATE SET
      email = COALESCE(EXCLUDED.email, users.email),
      name = COALESCE(EXCLUDED.name, users.name)
    RETURNING *
  `;

    if (!newUser) {
    throw new Error("Failed to create new User");
  }

  return newUser[0] ?? null;
}