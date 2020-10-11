const { createHash } = require('crypto');
const { PersistedEntity } = require('../base');

class Users extends PersistedEntity {
  static getEntityClass() {
    return Users;
  }

  static serialize(user) {
    return {
      id: user._id,
      created_at: user._created_at,
      name: user._name,
      email: user._email,
      birthday: user._birthday,
      password: user._password,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const user = new Users(
        serialized.name,
        serialized.email,
        serialized.birthday,
        serialized.password
      );
      user._id = serialized.id;
      user._created_at = serialized.created_at;

      // eslint-disable-next-line no-unused-vars
      const { _password, ...rest } = user;

      return rest;
    }
    return undefined;
  }

  constructor(name, email, birthday, password) {
    super();

    this._name = name;
    this._email = email;
    this._birthday = birthday;
    this._password = this.createHash(password);
  }

  createHash(passwd) {
    return createHash('sha256', {
      secretKey: process.env.secretKey,
    })
      .update(passwd)
      .digest('base64');
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get birthday() {
    return this._birthday;
  }
}

module.exports = Users;
