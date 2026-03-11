import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import * as controller from "./controller"
import { requireAuth } from "../../plugins/auth/auth";
import { createPostSchema, postIdSchema, updatePostSchema } from "./schema";

async function routes(
  fastifyServer: FastifyInstance,
  options: FastifyPluginOptions,
) {
    fastifyServer.route({
    method: "GET",
    url: "/",
    handler: controller.getAllPosts,
  });

    fastifyServer.route({
    method: "GET",
    url: "/:id",
    schema: postIdSchema,
    handler: controller.getPostById,
  });

    fastifyServer.route({
    method: "GET",
    url: "/user/:id",    
    schema: postIdSchema,
    handler: controller.getPostsByUserId,
  });

    fastifyServer.route({
    method: "POST",
    url: "/",
    preHandler: requireAuth,
    schema: createPostSchema,
    handler: controller.createNewPost,
  });

    fastifyServer.route({
    method: "PUT",
    url: "/:id",
    preHandler: requireAuth,
    schema: updatePostSchema,
    handler: controller.editPostById,
  });

    fastifyServer.route({
    method: "DELETE",
    url: "/:id",
    preHandler: requireAuth,
    schema: postIdSchema,
    handler: controller.deletePost,
  });

}
export default routes
