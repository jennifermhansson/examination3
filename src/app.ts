import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import postsRoutes from './modules/posts/routes';
import commentsRoutes from './modules/comments/routes';
import usersRoutes from './modules/users/routes';
import { authPlugin } from './plugins/auth/auth';
import { registerErrorHandler } from './plugins/error-handler';

// Här konfigureras appen med plugins, routes, middlewares och auth

export function App() {
  const app = fastify({
    logger: true,
  });

  app.register(cors, {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type'],
  });

  app.register(helmet);

  registerErrorHandler(app);

  app.register(authPlugin);
  app.register(usersRoutes, { prefix: '/users' });
  app.register(postsRoutes, { prefix: '/posts' });
  app.register(commentsRoutes, { prefix: '/comments' });

  return app;
}
