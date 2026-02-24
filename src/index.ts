import Fastify from "fastify"
import routes from "./routes";

const server = Fastify({
    logger: true
})

async function start() {  
  await server.register(routes);

  await server.listen({
    host: "0.0.0.0",
    port: 3000,
  });
  
  console.log("Server is listening at port 3000");
}

start();