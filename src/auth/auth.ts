import fastifyJwt from "@fastify/jwt";
import type { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import type { TokenPayload } from "../types/auth";
import getPublicKey from "./jwks";
// import { isAdmin } from "./repository/permissions";

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
    return reply.status(401).send({ message: "You are not authorized" });
  }
}
/* 
export async function requireAdmin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const token = await request.jwtVerify<TokenPayload>();
    const auth0Sub = token.sub;

    const userIsAdmin = await isAdmin(auth0Sub);

    // Returns 403 Forbidden if not admin
    if (!userIsAdmin) {
      return reply.status(403).send({ message: "Forbidden" });
    }
  } catch {
    // Returns 401 Unauthorized if token invalid
    return reply.status(401).send({ message: "You are not authorized" });
  }
} */

export async function authPlugin(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
) {
  await fastify.register(fastifyJwt, {
    secret: getPublicKey,
    decode: { complete: true },
  });

  fastify.decorate("requireAuth", requireAuth);
//   fastify.decorate("requireAdmin", requireAdmin);
}

export default fastifyPlugin(authPlugin);