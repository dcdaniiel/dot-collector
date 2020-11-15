const Koa = require('koa');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const router = require('./routes');
const { PersistorProvider } = require('../core/persist/provider');
const { persist_options } = require('../../settings/persist_options');

const middlewares = require('./middlewares');

const corsOptions = {
  origin: '*',
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
};

const server = async (port) => {
  const app = new Koa();

  PersistorProvider.getPersistor(...persist_options);

  const routes = router({
    middlewares: [],
    corsOptions,
  });

  app.on('error', (err, ctx) => {
    console.log('Server Error!: ', err, ctx);
  });
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      ctx.status = 500;
      if (error && error.status) {
        ctx.status = error.status;
      }
    }
  });
  app.use(logger());
  app.use(cors(corsOptions));

  for (const route of routes) {
    app.use(route);
  }

  return app.listen(port, () => {
    console.log(
      `Dot collector server is running on port: ${process.env.PORT} !`
    );
  });
};

module.exports = { server };
