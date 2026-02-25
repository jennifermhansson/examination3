import { App } from "./app"

const server = App()

    async function testDbConnection() {
      console.log("Connected to PostgreSQL");
    }

    async function start() {  
      await testDbConnection();
      await server.listen({
      host: "0.0.0.0",
      port: 3000,
    });

  console.log("Server is listening at port 3000");
}

start();