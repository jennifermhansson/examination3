import db from "../../src/db";
import type { SeedUserIds } from "./users";

export async function seedComments(userIds: SeedUserIds, postIds: number[]) {
  const { annaId, erikId, lisaId } = userIds;

  
  const [
    p1, p2, p3, 
    p4, p5, p6,  
    p7, p8, p9,  
  ] = postIds;

  await db`
    INSERT INTO comments (comment, post_id, user_id)
    VALUES
      ('Kul att se! Välkommen till utvecklarvärlden.', ${p1}, ${erikId}),
      ('Fastify är riktigt trevligt att jobba med.', ${p2}, ${lisaId}),
      ('Docker känns svårt i början men blir bättre.', ${p3}, ${erikId}),

      ('TypeScript är verkligen en lifesaver.', ${p4}, ${annaId}),
      ('Bra API-design gör livet lättare senare.', ${p5}, ${lisaId}),
      ('Den klassiska semikolon-buggen...', ${p6}, ${annaId}),

      ('Backend är underskattat!', ${p7}, ${erikId}),
      ('SQL JOINs är som pusselbitar.', ${p8}, ${annaId}),
      ('Kaffe är obligatoriskt för kod.', ${p9}, ${erikId})
  `;
}