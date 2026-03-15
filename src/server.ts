import { App } from './app';
import db from './db';

const server = App();

async function testDbConnection() {
  await db`SELECT 1`;
  console.log('Connected to PostgreSQL');
}

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || '0.0.0.0';

async function start() {
  await testDbConnection();
  await server.listen({
    host,
    port,
  });

  console.log('Server is listening at port 3000');
}

start();
