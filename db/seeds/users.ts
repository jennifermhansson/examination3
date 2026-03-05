import db from "../../src/db";

export type SeedUserIds = {
  annaId: number;
  erikId: number;
  lisaId: number;
};

export async function seedUsers(): Promise<SeedUserIds> {
  const [anna] = await db`
    INSERT INTO users (auth0_id, email, name, role)
    VALUES ('auth0|user1', 'anna@example.com', 'Anna Andersson', 'user')
    ON CONFLICT (auth0_id)
    DO UPDATE SET email = EXCLUDED.email, name = EXCLUDED.name, role = EXCLUDED.role
    RETURNING id
  `;

  const [erik] = await db`
    INSERT INTO users (auth0_id, email, name, role)
    VALUES ('auth0|user2', 'erik@example.com', 'Erik Eriksson', 'user')
    ON CONFLICT (auth0_id)
    DO UPDATE SET email = EXCLUDED.email, name = EXCLUDED.name, role = EXCLUDED.role
    RETURNING id
  `;

  const [lisa] = await db`
    INSERT INTO users (auth0_id, email, name, role)
    VALUES ('auth0|user3', 'lisa@example.com', 'Lisa Larsson', 'user')
    ON CONFLICT (auth0_id)
    DO UPDATE SET email = EXCLUDED.email, name = EXCLUDED.name, role = EXCLUDED.role
    RETURNING id
  `;

  if (!anna?.id || !erik?.id || !lisa?.id) {
    throw new Error(
      `seedUsers: RETURNING id gav tomt resultat. 
Orsak brukar vara att ON CONFLICT (auth0_id) inte funkar p.g.a. saknad UNIQUE constraint på auth0_id.`
    );
  }

  return { annaId: anna.id, erikId: erik.id, lisaId: lisa.id };
}