const Router = require('koa-router');
const UserModel = require('./model/Users');

const router = new Router();

router.get('/users', async (ctx, next) => {
  try {
    ctx.ok(await UserModel.getAll());
  } catch (e) {
    ctx.error(e);
  }
});

module.exports = router;
