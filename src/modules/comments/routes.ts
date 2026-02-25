import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import * as controller from "./controller"

async function routes(
  fastifyServer: FastifyInstance,
  options: FastifyPluginOptions,
) {
    fastifyServer.route({
    method: "GET",
    url: "/comments",
    handler: controller.getAllComments,
  });

}

export default routes