const { UserService } = require('../services');

module.exports = function UserController() {
  return {
    async create(ctx) {
      try {
        const { body } = ctx.request;
        const user = UserService().create(body);
        console.log('USER::: ', user);
      } catch (e) {
        console.log('ERROR::: ', e);
      }
    },
  };
};
