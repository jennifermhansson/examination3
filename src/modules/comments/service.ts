import * as repository from "./repository";
import { httpError } from "../../utils/httpError";

export async function createCommentForAuthUser(comment: string, postId: number, auth0_id: string) {
  if (!auth0_id) {
    throw httpError(401, "Invalid token payload", "UNAUTHORIZED");
  }

  if (!comment?.trim()) {
    throw httpError(400, "Comment is required", "BAD_REQUEST");
  }

  const newComment = await repository.createNewComment(comment, postId, auth0_id);

  if (!newComment) {
    throw httpError(404, "User or post not found. Failed to create new comment", "USER_OR_POST_NOT_FOUND");
  }

  return newComment;
}
