import { httpError } from "../utils/httpError";

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
    throw httpError(400, `Invalid ${fieldName}`, "BAD_REQUEST");
  }

  return id;
}