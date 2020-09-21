const Router = require('koa-router');

const router = new Router();

router.get('/', (ctx, next) => {
  ctx.ok({ id: 123, name: 'Daniel' });
});

module.exports = router;
