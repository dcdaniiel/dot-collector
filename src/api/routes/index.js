const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const UserRoute = require('./user.routes');

module.exports = (opts = {}) => {
  const router = Router().prefix('/api');
  router.use(bodyParser());
  router.use('/users', UserRoute.routes());

  return [router.routes()];
};
