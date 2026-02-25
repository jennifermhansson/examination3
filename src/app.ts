import fastify from "fastify";
import postsRoutes from "./modules/posts/routes";
import commentsRoutes from "./modules/comments/routes";

export function App() {
  const app = fastify({
    logger: true
  });

// app.register(authRoutes);
  app.register(postsRoutes);
  app.register(commentsRoutes);


return app;
}