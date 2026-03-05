import type { FastifyReply, FastifyRequest } from "fastify";
import * as service from "./service";
import type { TokenPayload } from "../../types/auth";
import type { CreatePostBody, EditPostBody, EditPostParams } from "../../types/http";


export async function getAllPosts(_request: FastifyRequest, reply: FastifyReply) {
  const posts = await service.getAllPosts();
  
  return reply.status(200).send(posts);
}

export async function getPostById(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const postId = Number(id);
  const post = await service.ensurePostExists(postId);

  return reply.status(200).send(post);
}

export async function getPostsByUserId(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const userId = Number(id)
  const posts = await service.getPostsByUserId(userId);
 
  return reply.status(200).send(posts);
}

export async function createNewPost(
  request: FastifyRequest<{ Body: CreatePostBody }>,
  reply: FastifyReply
) {
  const { title, content } = request.body;
  const auth0_id = (request.user as TokenPayload | undefined)?.sub;
  const newPost = await service.createPostForAuthUser(title, content, auth0_id);

  return reply.status(201).send(newPost);
}

export async function editPostById(
  request: FastifyRequest<{ Params: EditPostParams; Body: EditPostBody }>,
  reply: FastifyReply
) {
  const postId = Number(request.params.id);
  const { title, content } = request.body;

  const updated = await service.editPostById(
    postId,
    title,
    content,
  );

  return reply.status(200).send(updated);
}

export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const postId = Number(id);
  await service.deletePost(postId);

  return reply.status(204).send();
}