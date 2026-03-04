import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import * as controller from "./controller"
import { requireAuth } from "../../auth/auth";

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
    url: "/post/:id",
    handler: controller.getPostById,
  });

    fastifyServer.route({
    method: "GET",
    url: "/users/:id/posts",
    handler: controller.getPostsByUserId,
  });

    fastifyServer.route({
    method: "POST",
    url: "/posts",
    preHandler: requireAuth,
    handler: controller.createNewPost,
  });

    fastifyServer.route({
    method: "DELETE",
    url: "/posts/:id",
    preHandler: requireAuth,
    handler: controller.deletePost,
  });


}
export default routes
