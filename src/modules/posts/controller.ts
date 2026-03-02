import type { FastifyReply, FastifyRequest } from "fastify";
import * as repository from "./repository"
import type { TokenPayload } from "../../types/auth";
import type { CreatePostBody } from "../../types/http";

export async function getAllPosts(request: FastifyRequest, reply: FastifyReply) {
  const posts = await repository.getAllPosts();

  return reply.status(200).send(posts);
}

export async function getPostById(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const postById = await repository.getPostById(parseInt(id));

  return reply.status(200).send(postById);
}

// 1) Read post content from request body.
// 2) Read Auth0 user id (`sub`) from the already verified JWT payload.
// 3) If token payload is missing expected claim, reject request.
// 4) Repository maps auth0_id -> users.id and inserts the post with correct owner

export async function createNewPost(
  request: FastifyRequest<{ Body: CreatePostBody }>,
  reply: FastifyReply
) {
  const { title, content } = request.body;
  const auth0_id = (request.user as TokenPayload | undefined)?.sub;

  if (!auth0_id) {
    return reply.status(401).send({ message: "Invalid token payload" });
  }

  const newPost = await repository.createNewPost(title, content, auth0_id);

  return reply.status(201).send(newPost);
}