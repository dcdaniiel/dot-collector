const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

module.exports = (opts = {}) => {
  const router = Router();
  router.use(bodyParser());

  return [router.routes()];
};
