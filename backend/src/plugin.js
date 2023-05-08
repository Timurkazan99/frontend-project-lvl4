// @ts-check

import fastifySocketIo from 'fastify-socket.io';
import fastifyStatic from 'fastify-static';
import fastifyJWT from 'fastify-jwt';
import fastifyCors from '@fastify/cors';
import fastifyEnv from '@fastify/env';
import HttpErrors from 'http-errors';
import addRoutes from './routes.js';

const schema = {
  type: 'object',
  properties: {
    PORT: {
      type: 'string',
      default: 5000
    },
    URI: {
      type: 'string',
      default: ''
    }
  }
}

const { Unauthorized } = HttpErrors;

const setUpEnv = async (app) => {
  await app.register(fastifyEnv, {
    dotenv: true,
    schema
  });
}

const setUpStaticAssets = async (app, buildPath) => {
  await app.register(fastifyStatic, {
    root: buildPath,
  });
};

const setUpAuth = async (app) => {
  // TODO add socket auth
  await app
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
  await setUpEnv(app);
  await setUpAuth(app);
  await setUpStaticAssets(app, options.staticPath);
  const uri = app.config.URI;
  await app.register(fastifySocketIo, {
    path: `${uri}/socket/`
  });
  await app.register(fastifyCors, {
    origin: "*",
    methods: ["POST", "GET", "OPTIONS"]
  });
  addRoutes(app, options?.state || {});

  return app;
};
