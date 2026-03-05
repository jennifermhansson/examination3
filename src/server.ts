import { App } from "./app"

// här startar Fastify servern, lyssnar på porten och kontrollerar anslutningen till databasen.

// borde jag byta till port 3000?

const server = App()

    async function testDbConnection() {
      console.log("Connected to PostgreSQL");
    }

    async function start() {  
      await testDbConnection();
      await server.listen({
      host: "0.0.0.0",
      port: 3001,
    });

  console.log("Server is listening at port 3001");
}

start();