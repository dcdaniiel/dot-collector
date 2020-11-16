const { UserService } = require('../services');

module.exports = function UserController() {
  const user = UserService();
  return {
    async create(ctx) {
      try {
        const { body } = ctx.request;

        ctx.body = await user.create(body);
        ctx.status = 201;
      } catch (e) {
        console.error(e);
        ctx.body = e.detail;
        ctx.status = 400;
      }
    },
  };
};
