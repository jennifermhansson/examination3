import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import * as controller from "./controller"
import { requireAuth } from "../../plugins/auth/auth";
import { commentIdSchema, createCommentSchema, postIdParamsSchema } from "./schema";

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
    schema: { params: postIdParamsSchema },
    handler: controller.getCommentPerPost,
  });

    fastifyServer.route({
    method: "POST",
    url: "/posts/:postId/comments",
    preHandler: requireAuth,
    schema: createCommentSchema,
    handler: controller.createNewComment,
  });
  
    fastifyServer.route({
    method: "DELETE",
    url: "/comment/:id",
    preHandler: requireAuth,
    schema: commentIdSchema,
    handler: controller.deleteComment,
    });
}

export default routes