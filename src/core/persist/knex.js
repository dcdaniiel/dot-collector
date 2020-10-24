const {
  User,
  Event,
  Attribute,
  Evaluation,
  Account,
  Transfer,
  TransferTypes,
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
  get _initial_coins() {
    return 50;
  }

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
        const [user_id] = await trx(this._table).insert(obj, 'id');
        const [id] = await trx('accounts').insert(
          Account.serialize(new Account(user_id)),
          'id'
        );
        return trx('coins').insert(
          Coin.serialize(new Coin(id, null, this._initial_coins)),
          '*'
        );
      });
    } catch (e) {
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
        const { from_account, to_account, value, type } = obj;

        const fromEntity = await this._db('accounts')
          .where('id', from_account)
          .first();

        const toEntity = await this._db('accounts')
          .where('id', to_account)
          .first();

        if (!fromEntity || !toEntity) {
          return 'Account not exists';
        }

        if (from_account === to_account) {
          return 'Accounts cannot equals';
        }

        const fromCoinsData = await this._db('coins')
          .where('author_id', from_account)
          .first();

        const toCoinsData = await this._db('coins')
          .where('author_id', to_account)
          .first();

        if (type === TransferTypes.COINS()) {
          if (value > fromCoinsData.quantity) {
            return 'You not have coins sufficiently.';
          }

          const [id] = await trx(this._table).insert(obj, 'id');

          const coinFrom = new Coin(
            fromEntity.id,
            id,
            fromCoinsData.quantity - value
          );
          const coinTo = new Coin(
            toEntity.id,
            id,
            toCoinsData.quantity + value
          );

          await trx('coins').insert(Coin.serialize(coinFrom));
          await trx('coins').insert(Coin.serialize(coinTo));
        }
        // if (type === TransferTypes.REWARDS()) {
        //   const [id] = await trx(this._table).insert(obj, 'id');
        // }
      });
    } catch (e) {
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
