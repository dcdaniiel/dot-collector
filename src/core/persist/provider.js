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
  RewardMemoryPersist,
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
          User: [UsersKnexPersist, db],
          Event: [EventsKnexPersist, db],
          Attribute: [AttributesKnexPersist, db],
          Evaluation: [EvaluationsKnexPersist, db],
          Account: [AccountsKnexPersist, db],
          Transfer: [TransfersKnexPersist, db],
          Coin: [CoinsKnexPersist, db],
          Reward: [RewardsKnexPersist, db],
        };
        break;
      case 'memory':
        class_map = {
          User: [UsersMemoryPersist],
          Event: [EventsMemoryPersist],
          Attribute: [AttributesMemoryPersist],
          Evaluation: [EvaluationsMemoryPersist],
          Account: [AccountsMemoryPersist],
          Transfer: [TransfersMemoryPersist],
          Coin: [CoinsMemoryPersist],
          Reward: [RewardMemoryPersist],
        };
        break;
      default:
        throw Error('Invalid persist mode');
    }
    return new PersistorSingleton(class_map);
  }
}

module.exports = { PersistorProvider };
