
import { NotFound, Unauhtorized } from "../../utils/errors";
import * as repository from "./repository";

export async function syncUserFromAuth0(payload: {
  auth0_id: string;
  email?: string;
  name?: string;
}) {
  if (!payload.auth0_id) {
    throw new Unauhtorized("Invalid Auth0 payload",{})
    
  }

  const dbUser = await repository.upsertUser(payload);
  return dbUser;
}

export async function deleteUserById(userId: number) {
  const deletedUser = await repository.deleteUserById(userId);

  if (!deletedUser) {
     throw new NotFound("User not found with that ID",{})
    
  }

  return deletedUser;
}