import type { FastifyReply, FastifyRequest } from "fastify";
import * as repository from "./repository";
import * as service from "./service";
import type { TokenPayload } from "../../types/auth";
import type { CreatePostBody } from "../../types/http";
import { httpError } from "../../utils/httpError";
import { validateNumericId } from "../../utils/validations";


export async function getAllPosts(_request: FastifyRequest, reply: FastifyReply) {
  const posts = await repository.getAllPosts();
  return reply.status(200).send(posts);
  
}
export async function getPostById(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const postId = validateNumericId(id, "post id");
  const post = await repository.findPostById(postId);

  if (!post) {
    throw httpError(404, "Post not found", "POST_NOT_FOUND");
  }

  return reply.status(200).send(post);
}

export async function getPostsByUserId(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const userId = validateNumericId(id, "user id");

  const posts = await repository.getPostsByUserId(userId);
 
  return reply.status(200).send(posts);
}

/**
 * 1) Read post content from request body.
 * 2) Read Auth0 user id (`sub`) from the already verified JWT payload.
 * 3) If token payload is missing expected claim, reject request.
 * 4) Repository maps auth0_id -> users.id and inserts the post with correct owner.
 */
export async function createNewPost(
  request: FastifyRequest<{ Body: CreatePostBody }>,
  reply: FastifyReply
) {
  const { title, content } = request.body;
  const auth0_id = (request.user as TokenPayload | undefined)?.sub;

  const newPost = await service.createPostForAuthUser(title, content, auth0_id);
  return reply.status(201).send(newPost);
}