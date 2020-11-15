const bcrypt = require('bcryptjs');
const { User } = require('../../core/collector');

module.exports = function UserService() {
  return {
    async create(data) {
      return new User(data).save();
    },
  };
};
