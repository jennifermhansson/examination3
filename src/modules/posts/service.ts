import * as repository from "./repository";
import { BadRequest, Forbidden, NotFound, Unauthorized } from "../../utils/errors";
import { sanitizeText } from "../../utils/sanitizeText";

export async function getAllPosts() {
  return repository.getAllPosts();
}

export async function getPostsByUserId(userId: number) {
  return repository.getPostsByUserId(userId);
}

export async function ensurePostExists(postId: number) {
  const post = await repository.findPostById(postId);

  if (!post) {
     throw new NotFound("Post not found",{})}
  return post;
}

export async function createPostForAuthUser(
  title: string,
  content: string,
  auth0_id?: string
) {
  if (!auth0_id) {
    throw new Unauthorized("Invalid token payload", {})}

  const cleanTitle = sanitizeText(title);
  const cleanContent = sanitizeText(content);

  if (!cleanTitle || !cleanContent) {
    throw new BadRequest("Title and content are required", {})}

  const newPost = await repository.createNewPost(
    cleanTitle,
    cleanContent,
    auth0_id
  );

  return newPost;
}

export async function editPostById(
  postId: number,
  title: string,
  content: string,
  auth0_id?: string,
) {
  if (!auth0_id) {
    throw new Unauthorized("Invalid token payload", {});
  }

  const cleanTitle = sanitizeText(title);
  const cleanContent = sanitizeText(content);

  if (!cleanTitle || !cleanContent) {
    throw new BadRequest("Title and content are required", {})}

  const updated = await repository.updatePostByIdForUser(
    postId,
    cleanTitle,
    cleanContent,
    auth0_id,
  );

  if (updated) return updated;

  const exists = await repository.findPostById(postId);
  if (!exists) throw new NotFound("Post not found", {});
  throw new Forbidden("Not allowed to edit this post", {});
}

export async function deletePost(postId: number, auth0_id?: string) {
  if (!auth0_id) {
    throw new Unauthorized("Invalid token payload", {});
  }

  const postExist = await repository.deletePostById(postId, auth0_id);

  if (postExist) {
    return;
  }

  const exists = await repository.findPostById(postId);
  if (!exists) {
    throw new NotFound("Post not found", {});
  }

  throw new Forbidden("Not allowed to delete this post", {});
}
