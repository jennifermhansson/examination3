import { seedUsers } from "./users";
import { seedPosts } from "./posts";
import { seedComments } from "./comments";

export async function runSeeds() {
  console.log("Seeding database...");
/* 
  const userIds = await seedUsers();
  if (!userIds) throw new Error("seedUsers() returnerade inget (undefined/null).");

  console.log("User IDs:", userIds);

  const postIds = await seedPosts(userIds);
  console.log("Post IDs:", postIds);
 */
  // await seedComments(userIds, postIds);

  console.log("✅ Seed klart!");
}

runSeeds().catch((err) => {
  console.error("❌ Seed fail:", err);
  process.exit(1);
});