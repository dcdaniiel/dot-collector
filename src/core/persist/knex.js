const {
  User,
  Event,
  Attribute,
  Evaluation,
  Account,
  Transfer,
  Coin,
} = require('../collector');

class KnexPersist {
  constructor(db, class_, table) {
    this._db = db;
    this._class = class_;
    this._table = table;
  }

  async save(obj) {
    const is_update = obj.id && (await this.get(obj.id));
    if (is_update) {
      await this._update(obj.id, obj);
      return 'update';
    }

    await this._create(obj);
    return 'create';
  }

  async delete(obj_id) {
    return this._db(this._table).where('id', obj_id).del();
  }

  async deleteAll() {
    return this._db(this._table).del();
  }

  async get(obj_id) {
    return this._db(this._table).where('id', obj_id).first();
  }

  async getAll() {
    return this._db.select('*').from(this._table).orderBy('created_at', 'desc');
  }

  async first() {
    return this._db(this._table).first();
  }

  async _create(obj) {
    return this._db(this._table).insert(obj);
  }

  async _update(obj_id, obj) {
    return this._db(this._table).where('id', obj_id).update(obj);
  }
}

class UsersKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, User, 'users');
  }

  async getByName(obj_name) {
    return this._db(this._table)
      .where('name', '=', obj_name)
      .orderBy('name', 'desc')
      .first();
  }

  async _create(obj) {
    try {
      return await this._db.transaction(async (trx) => {
        const user_ids = await trx(this._table).insert(obj, 'id');
        const account = new Account(user_ids[0]);
        await trx('accounts').insert(Account.serialize(account));
      });
    } catch (e) {
      console.log('_create user trx: ', e.detail);
      return e.detail;
    }
  }
}

class EventsKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, Event, 'events');
  }
}

class AttributesKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, Attribute, 'attributes');
  }
}

class EvaluationsKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, Evaluation, 'evaluations');
  }
}

class AccountsKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, Account, 'accounts');
  }

  getAccountUser(user_id) {
    return this._db(this._table).where('user_id', user_id).first();
  }
}

class TransfersKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, Transfer, 'transfers');
  }

  async _create(obj) {
    try {
      return await this._db.transaction(async (trx) => {
        const { from_account, to_account } = obj;

        const from = await this._db('accounts')
          .where('id', from_account)
          .first();

        const to = await this._db('accounts').where('id', to_account).first();

        if (!to || !from) {
          return 'Account not exists';
        }

        if (from_account === to_account) {
          return 'Accounts can not equals';
        }

        await trx(this._table).insert(obj);

        return 'Transfer created.';
      });
    } catch (e) {
      console.log('ERROR create transfer: ', e);
      return `Error ${e}`;
    }
  }
}

class CoinsKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, Coin, 'coins');
  }
}

module.exports = {
  KnexPersist,
  UsersKnexPersist,
  EventsKnexPersist,
  AttributesKnexPersist,
  EvaluationsKnexPersist,
  AccountsKnexPersist,
  TransfersKnexPersist,
  CoinsKnexPersist,
};
