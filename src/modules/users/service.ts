
import * as repository from "./repository";

export async function syncUserFromAuth0(payload: {
  auth0_id: string;
  email?: string;
  name?: string;
}) {
  if (!payload.auth0_id) {
    throw new Error("Invalid Auth0 payload");
  }

  return repository.upsertUser(payload);
}