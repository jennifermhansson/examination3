import * as repository from "./repository";
import { BadRequest, Forbidden, NotFound, Unauhtorized } from "../../utils/errors";

export async function createCommentForAuthUser(comment: string, postId: number, auth0_id: string) {
  if (!auth0_id) {
    throw new Unauhtorized("Invalid token payload", {})
  }

  if (!comment?.trim()) {
    throw new BadRequest("Comment is required", {})
  }

  const newComment = await repository.createNewComment(comment, postId, auth0_id);

  if (!newComment) {
    throw new NotFound("User or post not found. Failed to create new comment",{});
  }

  return newComment;
}


export async function editCommentById(
  commentId: number,
  comment: string
) {
  const updated = await repository.updateCommentByIdForUser(commentId, comment);

  if (updated) return updated;

  // Om UPDATE inte returnerade något: antingen finns inte posten, eller så äger man den inte.
  // För att ge rätt statuskod kan du kolla existens separat:
  const exists = await repository.findCommentById(commentId);
  if (!exists) throw new NotFound("Comment not found", {});
  throw new Forbidden("Not allowed to edit this comment", {});
}



export async function deleteComment(id: number) {
  const commentExist = await repository.deleteCommentById(id);

  if (!commentExist) {
     throw new NotFound("Comment not found",{});
  }

  return;
}