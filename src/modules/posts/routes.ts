import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import * as controller from "./controller"
import { requireAuth } from "../../plugins/auth/auth";
import { createPostSchema, postIdSchema } from "./schema";

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
    schema: postIdSchema,
    handler: controller.getPostById,
  });

    fastifyServer.route({
    method: "GET",
    url: "/users/:id/posts",
    schema: postIdSchema,
    handler: controller.getPostsByUserId,
  });

    fastifyServer.route({
    method: "POST",
    url: "/posts",
    preHandler: requireAuth,
    schema: createPostSchema,
    handler: controller.createNewPost,
  });

    fastifyServer.route({
    method: "PUT",
    url: "/posts/:id",
    preHandler: requireAuth,
    schema: createPostSchema,
    handler: controller.editPostById,
  });

    fastifyServer.route({
    method: "DELETE",
    url: "/posts/:id",
    preHandler: requireAuth,
    schema: postIdSchema,
    handler: controller.deletePost,
  });


}
export default routes
