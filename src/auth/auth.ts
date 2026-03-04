import fastifyJwt from "@fastify/jwt";
import type { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import type { TokenPayload } from "../types/auth";
import getPublicKey from "./jwks";
import { isAdmin } from "../modules/users/repository";
import { BaseError, Forbidden, Unauhtorized } from "../utils/errors";


// Här finns isolerad auth-logik med JWT-verifiering, JWKS

declare module "fastify" {
  interface FastifyInstance {
    requireAuth(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    requireAdmin(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  }
}

export async function requireAuth(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify<TokenPayload>({});
  } catch (error) {
      request.log.error({ err: error }, "JWT verification failed");
      throw new Unauhtorized("You are not authorized", {})
  }
}

export async function requireAdmin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const token = await request.jwtVerify<TokenPayload>();
    const auth0Sub = token.sub;

    const userIsAdmin = await isAdmin(auth0Sub);

    if (!userIsAdmin) {
    
    throw new Forbidden("Not an admin", {})
  }
  } catch (error) {
    if (error instanceof BaseError) {
    
      throw error;
    }

    throw new Unauhtorized("You are not authorized", {})
  }
} 

export async function authPlugin(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
) {
  await fastify.register(fastifyJwt, {
    secret: getPublicKey,
    decode: { complete: true },
  });

  fastify.decorate("requireAuth", requireAuth);
 fastify.decorate("requireAdmin", requireAdmin);
}

export default fastifyPlugin(authPlugin);