import * as repository from "./repository";
import { BadRequest, Forbidden, NotFound, Unauhtorized } from "../../utils/errors";

export async function getAllPosts() {
  return repository.getAllPosts();
}

export async function getPostsByUserId(userId: number) {
  return repository.getPostsByUserId(userId);
}

export async function createPostForAuthUser(title: string, content: string, auth0_id?: string) {
  if (!auth0_id) {
    throw new Unauhtorized("Invalid token payload", {})
    
  }

  if (!title?.trim() || !content?.trim()) {
    throw new BadRequest("Title and content are required", {})
  }

  const newPost = await repository.createNewPost(title, content, auth0_id);

  if (!newPost) {
     throw new NotFound("Failed to create post. User not found",{});
  }

  return newPost;
}

export async function deletePost(postId: number) {
  const postExist = await repository.deletePostById(postId);

  if (!postExist) {
    throw new NotFound("Post not found",{});
  }

  return;
}

export async function ensurePostExists(postId: number) {
  const post = await repository.findPostById(postId);

  if (!post) {
     throw new NotFound("Post not found",{});
  }

  return post;
}

export async function editPostById(
  postId: number,
  title: string,
  content: string,
) {
  const updated = await repository.updatePostByIdForUser(postId, title, content);

  if (updated) return updated;

  // Om UPDATE inte returnerade något: antingen finns inte posten, eller så äger man den inte.
  // För att ge rätt statuskod kan du kolla existens separat:
  const exists = await repository.findPostById(postId);
  if (!exists) throw new NotFound("Post not found", {});
  throw new Forbidden("Not allowed to edit this post", {});
}

