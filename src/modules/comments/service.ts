import * as repository from "./repository";
import * as postsRepo from "../posts/repository";
import { BadRequest, Forbidden, NotFound, Unauthorized } from "../../utils/errors";
import { sanitizeText } from "../../utils/sanitizeText";

export async function createCommentForAuthUser(
  comment: string,
  postId: number,
  auth0_id: string
) {
  if (!auth0_id) {
    throw new Unauthorized("Invalid token payload", {});
  }

  const cleanComment = sanitizeText(comment);

  if (!cleanComment) {
    throw new BadRequest("Comment is required", {});
  }

  const post = await postsRepo.findPostById(postId);
  if (!post) {
    throw new NotFound("Post not found", {});
  }

  const newComment = await repository.createNewComment(
    cleanComment,
    postId,
    auth0_id
  );

  return newComment;
}



export async function editCommentById(
  commentId: number,
  comment: string,
  auth0_id?: string
) {
  if (!auth0_id) {
    throw new Unauthorized("Invalid token payload", {});
  }

  const cleanComment = sanitizeText(comment);

  if (!cleanComment) {
    throw new BadRequest("Comment is required", {});
  }

  const updated = await repository.updateCommentByIdForUser(
    commentId,
    cleanComment,
    auth0_id
  );

  if (updated) return updated;

  const exists = await repository.findCommentById(commentId);
  if (!exists) throw new NotFound("Comment not found", {});
  throw new Forbidden("Not allowed to edit this comment", {});
}



export async function deleteComment(id: number, auth0_id?: string) {
  if (!auth0_id) {
    throw new Unauthorized("Invalid token payload", {});
  }

  const commentExist = await repository.deleteCommentById(id, auth0_id);

  if (commentExist) {
    return;
  }

  const exists = await repository.findCommentById(id);
  if (!exists) {
    throw new NotFound("Comment not found", {});
  }

  throw new Forbidden("Not allowed to delete this comment", {});
}