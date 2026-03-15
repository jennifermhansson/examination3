import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import * as controller from './controller';
import { requireAuth, requireAdmin } from '../../plugins/auth/auth';
import { userIdSchema, CreateUserSchema } from './schema';

// prefix /users på alla routes.

async function routes(
  fastifyServer: FastifyInstance,
  options: FastifyPluginOptions,
) {
  fastifyServer.route({
    method: 'POST',
    url: '/me',
    preHandler: requireAuth,
    schema: CreateUserSchema,
    handler: controller.getOrCreateUser,
  });

  fastifyServer.route({
    method: 'GET',
    url: '/',
    preHandler: requireAdmin,
    handler: controller.getAllUsers,
  });

  fastifyServer.route({
    method: 'DELETE',
    url: '/:id',
    preHandler: requireAdmin,
    schema: userIdSchema,
    handler: controller.deleteUser,
  });
}

export default routes;
