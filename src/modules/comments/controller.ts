import type { FastifyReply, FastifyRequest } from "fastify";
import * as repository from "./repository";
import * as service from "./service";
import type { TokenPayload } from "../../types/auth";
import type { CreateCommentBody } from "../../types/http";
// import { validateNumericId } from "../../utils/validations";

export async function getAllComments(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const comments = await repository.getAllComments();
  return reply.status(200).send(comments);
}

export async function createNewComment(request: FastifyRequest<{Params: { postId: string }; Body: CreateCommentBody;}>,
  reply: FastifyReply
) {
  const postId = Number(request.params.postId); 
  const { comment } = request.body;
  const auth0_id = (request.user as TokenPayload | undefined)?.sub ?? "";

  const newComment = await service.createCommentForAuthUser(
    comment,
    postId,
    auth0_id
  );

  return reply.status(201).send(newComment);
}

export async function getCommentPerPost(
  request: FastifyRequest<{ Params: { postId: string } }>,
  reply: FastifyReply
) {
  const postId = Number(request.params.postId); 
  const comments = await repository.getCommentPerPost(postId);

  return reply.status(200).send(comments);
}

export async function deleteComment(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const commentId = Number(id);
  await service.deleteComment(commentId);
  
  return reply.status(204).send();
}