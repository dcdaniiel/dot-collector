const {
  Users,
  Events,
  Attributes,
  Evaluations,
  Accounts,
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
    super(db, Users, 'users');
  }

  async getByName(obj_name) {
    return this._db(this._table)
      .where('name', '=', obj_name)
      .orderBy('name', 'desc')
      .first();
  }

  async _create(obj) {
    try {
      await this._db.transaction(async (trx) => {
        const user_ids = await trx(this._table).insert(obj, 'id');
        const account = new Accounts(user_ids[0]);
        await trx('accounts').insert(Accounts.serialize(account));
      });
    } catch (e) {
      console.log('_create user trx: ', e.detail);
    }
  }
}

class EventsKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, Events, 'events');
  }
}

class AttributesKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, Attributes, 'attributes');
  }
}

class EvaluationsKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, Evaluations, 'evaluations');
  }
}

class AccountsKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, Accounts, 'accounts');
  }

  getAccountUser(user_id) {
    return this._db(this._table).where('user_id', user_id).first();
  }
}

module.exports = {
  KnexPersist,
  UsersKnexPersist,
  EventsKnexPersist,
  AttributesKnexPersist,
  EvaluationsKnexPersist,
  AccountsKnexPersist,
};
