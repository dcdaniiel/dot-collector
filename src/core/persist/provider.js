const {
  UsersKnexPersist,
  EventsKnexPersist,
  AttributesKnexPersist,
  EvaluationsKnexPersist,
  AccountsKnexPersist,
  TransfersKnexPersist,
  CoinsKnexPersist,
  RewardsKnexPersist,
} = require('./knex');
const {
  UsersMemoryPersist,
  EventsMemoryPersist,
  AttributesMemoryPersist,
  EvaluationsMemoryPersist,
  AccountsMemoryPersist,
  TransfersMemoryPersist,
  CoinsMemoryPersist,
} = require('./memory');
const { PersistorSingleton } = require('./persist');

class PersistorProvider {
  static getPersistor(persist_mode, ...args) {
    if (PersistorProvider.instance) {
      return PersistorProvider.instance;
    }
    let class_map;

    switch (persist_mode) {
      case 'knex':
        const db = args[0];
        class_map = {
          Users: [UsersKnexPersist, db],
          Events: [EventsKnexPersist, db],
          Attributes: [AttributesKnexPersist, db],
          Evaluations: [EvaluationsKnexPersist, db],
          Accounts: [AccountsKnexPersist, db],
          Transfers: [TransfersKnexPersist, db],
          Coins: [CoinsKnexPersist, db],
          Rewards: [RewardsKnexPersist, db],
        };
        break;
      case 'memory':
        class_map = {
          Users: [UsersMemoryPersist],
          Events: [EventsMemoryPersist],
          Attributes: [AttributesMemoryPersist],
          Evaluations: [EvaluationsMemoryPersist],
          Accounts: [AccountsMemoryPersist],
          Transfers: [TransfersMemoryPersist],
          Coins: [CoinsMemoryPersist],
        };
        break;
      default:
        throw Error('Invalid persist mode');
    }
    return new PersistorSingleton(class_map);
  }
}

module.exports = { PersistorProvider };
