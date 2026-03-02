import type { FastifyReply, FastifyRequest } from "fastify";
import * as repository from "./repository"
import type { TokenPayload } from "../../types/auth";
import type { CreateCommentBody } from "../../types/http";

export async function getAllComments(request: FastifyRequest, reply: FastifyReply) {
  const comments = await repository.getAllComments();

  return reply.status(200).send(comments);
}
// 1) Read comment payload from request body.
// 2) Read Auth0 user id (`sub`) from verified JWT payload.
// 3) Reject if token payload is missing expected user claim.
// 4) Repository maps auth0_id -> users.id and inserts comment with correct owner.
export async function createNewComment(
  request: FastifyRequest<{ Params: { postId: string }; Body: CreateCommentBody }>,
  reply: FastifyReply
) {
  const { postId } = request.params;
  const { comment } = request.body;
  const parsedPostId = parseInt(postId);
  const auth0_id = (request.user as TokenPayload | undefined)?.sub;

  if (Number.isNaN(parsedPostId)) {
    return reply.status(400).send({ message: "Invalid postId" });
  }

  if (!auth0_id) {
    return reply.status(401).send({ message: "Invalid token payload" });
  }

  const newComment = await repository.createNewComment(comment, parsedPostId, auth0_id);

  return reply.status(201).send(newComment);
}

export async function getCommentPerPost(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { postId } = request.params as { postId: string };
  const comments = await repository.getCommentPerPost(parseInt(postId));

  return reply.status(200).send(comments);
}