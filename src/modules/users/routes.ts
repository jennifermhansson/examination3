  import type { FastifyInstance, FastifyPluginOptions } from "fastify";
  import * as controller from "./controller";
  import { requireAuth, requireAdmin } from "../../plugins/auth/auth";
  import { userIdSchema } from "./schema";

  // prefix /users på alla routes.

  async function routes(
    fastifyServer: FastifyInstance,
    options: FastifyPluginOptions,
  ) {

      fastifyServer.route({
      method: "GET",
      url: "/me",
      preHandler: requireAuth,
      handler: controller.getOrCreateUser,
    });

      fastifyServer.route({
      method: "GET",
      url: "/",
      preHandler: requireAdmin,
      handler: controller.getAllUsers,
    });

    // kolla om delete ska ha protected också?
      fastifyServer.route({
      method: "DELETE",
      url: "/:id",
      preHandler: requireAdmin,
      schema: userIdSchema,
      handler: controller.deleteUser,
    });
  }

  export default routes