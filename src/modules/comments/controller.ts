import type { FastifyReply, FastifyRequest } from "fastify";
import * as repository from "./repository"

export async function getAllComments(request: FastifyRequest, reply: FastifyReply) {
  const comments = await repository.getAllComments();

  return reply.status(200).send(comments);
}