const { UserController } = require('../controller');

function User(router) {
  const user = UserController();

  router.post('/', user.create);

  return router;
}
