const { PersistedEntity } = require('../base');

class Accounts extends PersistedEntity {
  static getEntityClass() {
    return Accounts;
  }

  static serialize(account) {
    return {
      id: account._id,
      created_at: account._created_at,
      user_id: account._user_id,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const accounts = new Accounts(serialized.user_id);
      accounts._id = serialized.id;
      accounts._created_at = serialized.created_at;

      return accounts;
    }
    return undefined;
  }

  constructor(user_id) {
    super();

    this._user_id = user_id;
  }

  get user() {
    return this._user_id;
  }
}

module.exports = Accounts;
