const { User } = require('../../core/collector');

module.exports = function UserService() {
  return {
    async create(data) {
      const { name, email, birthday, password } = data;
      // eslint-disable-next-line no-unused-vars
      const { _password, ...user } = await new User(
        name,
        email,
        birthday,
        password
      ).save();
      return user;
    },
  };
};
