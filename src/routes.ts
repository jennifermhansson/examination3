import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import * as controllers from "./controllers";

async function routes(
  fastifyServer: FastifyInstance,
  options: FastifyPluginOptions,
) {
    fastifyServer.route({
    method: "GET",
    url: "/posts",
    handler: controllers.getAllPosts,
  });

    fastifyServer.route({
    method: "GET",
    url: "/posts/:id",
    handler: controllers.getPostById,
  });

    fastifyServer.route({
    method: "POST",
    url: "/posts",
    handler: controllers.createNewPost,
  });

  
}
  export default routes
