import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import * as controller from "./controller"

async function routes(
  fastifyServer: FastifyInstance,
  options: FastifyPluginOptions,
) {
    fastifyServer.route({
    method: "GET",
    url: "/posts",
    handler: controller.getAllPosts,
  });

    fastifyServer.route({
    method: "GET",
    url: "/posts/:id",
    handler: controller.getPostById,
  });

    fastifyServer.route({
    method: "POST",
    url: "/posts",
    handler: controller.createNewPost,
  });

}
export default routes
