import db from "../../src/db";
import type { SeedUserIds } from "./users";

export async function seedPosts(userIds: SeedUserIds) {
  const { annaId, erikId, lisaId } = userIds;

  const res = await db`
    INSERT INTO posts (title, content, user_id)
    VALUES
      ('Min första post', 'Hej världen! Detta är mitt första inlägg.', ${annaId}),
      ('Backend är kul', 'Jag håller på att lära mig Fastify och Postgres.', ${annaId}),
      ('Docker resa', 'Idag lyckades jag få Docker att fungera!', ${annaId}),

      ('TypeScript tankar', 'TypeScript räddar mig från många buggar.', ${erikId}),
      ('API design', 'Att bygga ett REST API är mer strukturerat än jag trodde.', ${erikId}),
      ('Debugging dag', 'Tillbringade två timmar på ett semikolon.', ${erikId}),

      ('Frontend vs Backend', 'Jag gillar båda men backend känns mer logiskt.', ${lisaId}),
      ('SQL magi', 'JOINs börjar faktiskt kännas logiska nu.', ${lisaId}),
      ('Kod och kaffe', 'Den bästa kombinationen när man pluggar.', ${lisaId})
    RETURNING id
  `;

  // postgres.js returnerar en array av rader
  return res.map((r: { id: number }) => r.id);
}