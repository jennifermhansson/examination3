import fastify from "fastify";
import postsRoutes from "./modules/posts/routes";
import commentsRoutes from "./modules/comments/routes";
import usersRoutes from "./modules/users/routes";
import { authPlugin } from "./auth/auth";

// Här konfigureras appen med plugins, routes, middlewares och auth

export function App() {
  const app = fastify({
    logger: true
  });

  app.register(authPlugin);
  app.register(postsRoutes, commentsRoutes);
  app.register(usersRoutes, { prefix: "/users" });


return app;
}