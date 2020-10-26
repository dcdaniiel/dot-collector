const {
  User,
  Event,
  Attribute,
  Evaluation,
  Account,
  Transfer,
  TransferTypes,
  Coin,
  Reward,
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

        if (from_account === to_account) {
          return 'Accounts cannot equals';
        }

        const fromEntity = await this._db('accounts')
          .where('id', from_account)
          .first();

        const toEntity = await this._db('accounts')
          .where('id', to_account)
          .first();

        if (!fromEntity || !toEntity) {
          return 'Account not exists';
        }

        const toCoinsData = await this._db('coins')
          .where('author_id', to_account)
          .first();

        if (type === TransferTypes.COINS()) {
          const fromCoinsData = await this._db('coins')
            .where('author_id', from_account)
            .first();

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

          return 'Transfer success.';
        }

        if (type === TransferTypes.REWARDS()) {
          const { quantity, name } = await this._db('rewards')
            .where('id', value)
            .first();

          if (toCoinsData.quantity > quantity) {
            const [id] = await trx(this._table).insert(
              { ...obj, value: 0 },
              'id'
            );

            try {
              const data = await trx('rewards').insert(
                Reward.serialize(new Reward(to_account, id, name, quantity)),
                '*'
              );
              console.log('TESTE:::', data);
            } catch (e) {
              console.log('TESTE:::', e);
            }

            return 'Success on get the reward.';
          }

          return new Error('You not have coins for this reward.');
        }

        return new Error('Type of undefined');
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

class RewardsKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, Reward, 'rewards');
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
  RewardsKnexPersist,
};
