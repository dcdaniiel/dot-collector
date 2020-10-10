const { User } = require('../../core/collector');
const { PersistorProvider } = require('../../core/persist/provider');
const { persistorProviderSettings } = require('../../core/settings/index');

class UserModel {
  constructor(persist_mode, args) {
    PersistorProvider.getPersistor(persist_mode, args);
    this._persist = User.getPersist();
  }

  async update(obj) {
    try {
      return await this._persist.save(obj);
    } catch (e) {
      return e.detail;
    }
  }

  async getAll() {
    try {
      const users = await this._persist.getAll();
      return users.map((user) => User.deserialize(user));
    } catch (e) {
      return e.detail;
    }
  }
}

module.exports = new UserModel(...persistorProviderSettings);
