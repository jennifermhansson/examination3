import { BadRequest } from "./errors";


/**
 * Validerar och konverterar postId från route param.
 * Kastar 400 om ogiltigt.
 */
export function validateNumericId(
  rawId: string,
  fieldName = "id"
): number {
  const id = Number(rawId);

  if (!Number.isInteger(id) || id <= 0) {
    throw new BadRequest(`Invalid ${fieldName}`, {})
  
  }

  return id;
}