import fastifyJwt from "@fastify/jwt";
import type { FastifyInstance,FastifyPluginOptions,FastifyReply,FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import type { TokenPayload } from "../../types/auth";
import getPublicKey from "./jwks";
import { BaseError, Forbidden, Unauthorized } from "../../utils/errors";

function hasPermission(payload: TokenPayload, permission: string) {
  if (Array.isArray(payload.permissions) && payload.permissions.includes(permission)) {
    return true;
  }

  if (typeof payload.scope === "string") {
    return payload.scope.split(" ").includes(permission);
  }

  return false;
}

declare module "fastify" {
  interface FastifyInstance {
    requireAuth(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    requireAdmin(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  }
}

export async function requireAuth(
  request: FastifyRequest,
  _reply: FastifyReply,
) {
  try {
    await request.jwtVerify();
  } catch (error) {
    request.log.error({ err: error }, "JWT verification failed");
    throw new Unauthorized("You are not authorized", {});
  }
}

export async function requireAdmin(
  request: FastifyRequest,
  _reply: FastifyReply,
) {
  try {
    const token = await request.jwtVerify<TokenPayload>();

    const allowed = hasPermission(token, "manage:users");

    if (!allowed) {
      throw new Forbidden("Not an admin", {});
    }
  } catch (error) {
    if (error instanceof BaseError) {
      throw error;
    }

    request.log.error({ err: error }, "Admin auth failed");
    throw new Unauthorized("You are not authorized", {});
  }
} 

export async function authPlugin(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
) {
  await fastify.register(fastifyJwt, {
    secret: getPublicKey,
    decode: { complete: true },
    verify: {
      allowedIss: process.env.AUTH0_ISSUER!,
      allowedAud: process.env.AUTH0_AUDIENCE!,
    },
  });

  fastify.decorate("requireAuth", requireAuth);
  fastify.decorate("requireAdmin", requireAdmin);
}

export default fastifyPlugin(authPlugin);