import { App } from "./app"

// här startar Fastify servern, lyssnar på porten och kontrollerar anslutningen till databasen.

// borde jag byta till port 3000?

const server = App()

    async function testDbConnection() {
      console.log("Connected to PostgreSQL");
    }

    const port = Number(process.env.PORT) || 3000;
    const host = process.env.HOST || "0.0.0.0";

    async function start() {  
      await testDbConnection();
      await server.listen({
      host,
      port,
    });

  console.log("Server is listening at port 3000");
}

start();