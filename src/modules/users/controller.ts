import type { FastifyReply, FastifyRequest } from "fastify";
import * as service from "./service";

export async function getOrCreateUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authUser = request.user as any;
  const auth0Id = authUser?.sub;

  if (!auth0Id) {
    return reply.status(401).send({ message: "Invalid token payload" });
  }

  const dbUser = await service.syncUserFromAuth0({
    auth0_id: auth0Id,
    email: authUser?.email,
    name: authUser?.name ?? authUser?.nickname,
  });

  return reply.status(200).send(dbUser);
}