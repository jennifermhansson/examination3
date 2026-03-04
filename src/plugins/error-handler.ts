import type { FastifyInstance } from "fastify"
import { BaseError, InternalError } from "../utils/errors"

export function registerErrorHandler(app: FastifyInstance) {
app.setErrorHandler((error: unknown, request, reply) => {
    if(error instanceof BaseError) {
      const publicError = error.toPublicError()
      return reply.status(error.statusCode).send(publicError)
    }
  

  const unknownError = new InternalError("Unknown error", error as Error)

    console.log(error)

    return reply
    .status(unknownError.statusCode)
    .send(unknownError.toPublicError())

  })

  }