import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

async function runMigrations() {
  const migrationsPath = join(process.cwd(), "db/migrations");

  const files = readdirSync(migrationsPath)
    .filter(f => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    console.log(`Running migration: ${file}`);

    const query = readFileSync(join(migrationsPath, file), "utf8");

    await sql.unsafe(query);
  }

  console.log("All migrations completed");
  process.exit(0);
}

runMigrations();