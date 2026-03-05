import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import * as controller from "./controller";
import { requireAuth, requireAdmin } from "../../plugins/auth/auth";
// import { CreateUserSchema } from "./schema";


async function routes(
  fastifyServer: FastifyInstance,
  options: FastifyPluginOptions,
) {

    fastifyServer.route({
    method: "GET",
    url: "/protected",
    preHandler: requireAuth,
    handler: controller.getOrCreateUser,
  });

    fastifyServer.route({
    method: "GET",
    url: "/me",
    preHandler: requireAuth,
    // schema: CreateUserSchema,
    handler: controller.getOrCreateUser,
  });

    fastifyServer.route({
    method: "DELETE",
    url: "/:id",
    preHandler: requireAdmin,
    handler: controller.deleteUser,
  });
}

export default routes