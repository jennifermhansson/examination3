import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import * as controller from "./controller";
import { requireAuth, requireAdmin } from "../../plugins/auth/auth";
import { userIdSchema } from "./schema";
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

  // kolla om delete ska ha protected också?
    fastifyServer.route({
    method: "DELETE",
    url: "/delete/:id",
    preHandler: requireAdmin,
    schema: userIdSchema,
    handler: controller.deleteUser,
  });
}

export default routes