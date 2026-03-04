/* import { BadRequest } from "./errors";


export function validateNumericId(
  rawId: string,
  fieldName = "id"
): number {
  const id = Number(rawId);

  if (!Number.isInteger(id) || id <= 0) {
    throw new BadRequest(`Invalid ${fieldName}`, {})
  
  }

  return id;
} */