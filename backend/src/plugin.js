// @ts-check

import fastifySocketIo from 'fastify-socket.io';
import fastifyStatic from 'fastify-static';
import fastifyJWT from 'fastify-jwt';
import fastifyCors from '@fastify/cors';
import HttpErrors from 'http-errors';

import addRoutes from './routes.js';

const { Unauthorized } = HttpErrors;

const setUpStaticAssets = (app, buildPath) => {
  app.register(fastifyStatic, {
    root: buildPath,
  });
};

const setUpAuth = (app) => {
  // TODO add socket auth
  app
    .register(fastifyJWT, {
      secret: 'supersecret',
    })
    .decorate('authenticate', async (req, reply) => {
      try {
        await req.jwtVerify();
      } catch (_err) {
        reply.send(new Unauthorized());
      }
    });
};

export default async (app, options) => {
  setUpAuth(app);
  setUpStaticAssets(app, options.staticPath);
  await app.register(fastifySocketIo);
  await app.register(fastifyCors, {
    origin: "*",
    methods: ["POST", "GET", "OPTIONS"]
  });
  addRoutes(app, options?.state || {});

  return app;
};
