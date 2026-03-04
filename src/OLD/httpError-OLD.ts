export class HttpError extends Error {
  statusCode: number;
  code?: string;

  constructor(statusCode: number, message: string, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
    this.code = code;
  }
}

export function httpError(
  statusCode: number,
  message: string,
  code?: string
) {
  return new HttpError(statusCode, message, code);
}