const { UserService } = require('../services');

module.exports = function UserController() {
  return {
    async create(ctx) {
      try {
        const { body } = ctx.request;

        ctx.body = await UserService().create(body);
        ctx.status = 200;
      } catch (e) {
        console.error(e.detail);
        ctx.body = e.detail;
        ctx.status = 400;
      }
    },
  };
};
