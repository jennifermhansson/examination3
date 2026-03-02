import type { FastifyInstance, FastifyError } from "fastify";

type AppError = FastifyError & {
  statusCode?: number;
  code?: string;
};

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error: AppError, request, reply) => {
    const statusCode =
      typeof error.statusCode === "number"
        ? error.statusCode
        : 500;

    const code =
      error.code ??
      (statusCode >= 500
        ? "INTERNAL_SERVER_ERROR"
        : "REQUEST_ERROR");

    if (statusCode >= 500) {
      request.log.error({ err: error }, "Unhandled error");
    } else {
      request.log.warn({ err: error }, "Request error");
    }

    const message =
      statusCode >= 500
        ? "Internal Server Error"
        : error.message;

    reply.status(statusCode).send({
      statusCode,
      code,
      message,
    });
  });
}