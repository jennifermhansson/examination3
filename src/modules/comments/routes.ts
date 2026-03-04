import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import * as controller from "./controller"
import { requireAuth } from "../../auth/auth";

async function routes(
  fastifyServer: FastifyInstance,
  options: FastifyPluginOptions,
) {
    fastifyServer.route({
    method: "GET",
    url: "/comments",
    handler: controller.getAllComments,
  });

    fastifyServer.route({
    method: "GET",
    url: "/posts/:postId/comments",
    handler: controller.getCommentPerPost,
  });

    fastifyServer.route({
    method: "POST",
    url: "/posts/:postId/comments",
    preHandler: requireAuth,
    handler: controller.createNewComment,
  });
  
    fastifyServer.route({
    method: "DELETE",
    url: "/comment/:id",
    preHandler: requireAuth,
    handler: controller.deleteComment,
    });
}

export default routes