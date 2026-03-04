import type { FastifyReply, FastifyRequest } from "fastify";
import * as service from "./service";

export async function getOrCreateUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authUser = request.user as any;
  const auth0Id = authUser?.sub;

  const dbUser = await service.syncUserFromAuth0({
    auth0_id: auth0Id,
    email: authUser?.email,
    name: authUser?.name ?? authUser?.nickname,
  });

  return reply.status(200).send(dbUser);
}

type DeleteUserParams = {
  id: string;
};

export async function deleteUser(
  request: FastifyRequest<{ Params: DeleteUserParams }>,
  reply: FastifyReply,
) {
  const { id } = request.params;
  const userId = Number(id)

  await service.deleteUserById(userId)

  return reply.status(200).send({ message: `User ${userId} deleted` });
}