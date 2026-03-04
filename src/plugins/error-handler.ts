import type { FastifyInstance } from "fastify"
import { BaseError, InternalError, ValidationError } from "../utils/errors"

export function registerErrorHandler(app: FastifyInstance) {
app.setErrorHandler((error: unknown, request, reply) => {
    if(error instanceof BaseError) {
      const publicError = error.toPublicError()
      return reply.status(error.statusCode).send(publicError)
    }
    
    if ((error as any)?.code === "FST_ERR_VALIDATION") {
    const validationError = new ValidationError("Invalid request data", error as Error);

    return reply
    .status(validationError.statusCode)
    .send(validationError.toPublicError());
    }

    const unknownError = new InternalError("Unknown error", error as Error)

    console.log(error)

    return reply
    .status(unknownError.statusCode)
    .send(unknownError.toPublicError())

  })

  }