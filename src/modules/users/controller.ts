import type { FastifyReply, FastifyRequest } from 'fastify';
import * as service from './service';
import type { DeleteUserParams } from '../../types/http';

export async function getOrCreateUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authUser = request.user as any;
  const auth0Id = authUser?.sub;

  const body = (request.body as any) ?? {};
  const query = (request.query as any) ?? {};

  const email = body.email ?? query.email ?? authUser?.email;
  const name = body.name ?? query.name ?? authUser?.name ?? authUser?.nickname;

  const dbUser = await service.syncUserFromAuth0({
    auth0_id: auth0Id,
    email,
    name,
  });

  return reply.status(200).send(dbUser);
}

export async function getAllUsers(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const users = await service.getAllUserForAdmin();

  return reply.status(200).send(users);
}

export async function deleteUser(
  request: FastifyRequest<{ Params: DeleteUserParams }>,
  reply: FastifyReply,
) {
  const { id } = request.params;
  const userId = Number(id);

  await service.deleteUserById(userId);
  return reply.status(204).send();
}
