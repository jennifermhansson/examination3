import * as repository from "./repository";
import { httpError } from "../../utils/httpError";

export async function createPostForAuthUser(title: string, content: string, auth0_id?: string) {
  if (!auth0_id) {
    throw httpError(401, "Invalid token payload", "UNAUTHORIZED");
  }

  if (!title?.trim() || !content?.trim()) {
    throw httpError(400, "Title and content are required", "BAD_REQUEST");
  }

  const newPost = await repository.createNewPost(title, content, auth0_id);

  if (!newPost) {
    throw httpError(404, "User not found. Failed to create new post", "USER_NOT_FOUND");
  }

  return newPost;
}
