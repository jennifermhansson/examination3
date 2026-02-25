import type { FastifyReply, FastifyRequest } from "fastify";
import * as repository from "./repository"

export async function getAllPosts(request: FastifyRequest, reply: FastifyReply) {
  const posts = await repository.getAllPosts();

  return reply.status(200).send(posts);
}

export async function getPostById(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const postById = await repository.getPostById(parseInt(id));

  return reply.status(200).send(postById);
}

export async function createNewPost(request: FastifyRequest, reply: FastifyReply) {
  const newPost = await repository.createNewPost();

  return reply.status(200).send(newPost);
}