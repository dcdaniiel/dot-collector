const { User } = require('../../core/collector');

module.exports = function UserService() {
  return {
    async create(data) {
      // eslint-disable-next-line no-unused-vars
      const { _password, ...user } = await new User(data).save();
      return user;
    },
  };
};
