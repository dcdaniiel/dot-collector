const { UserKnexPersist, EventKnexPersist } = require('./knex');
const { UsersMemoryPersist, EventsMemoryPersist } = require('./memory');
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
          Users: [UserKnexPersist, db],
          Events: [EventKnexPersist, db],
        };
        break;
      case 'memory':
        class_map = {
          Users: [UsersMemoryPersist],
          Events: [EventsMemoryPersist],
        };
        break;
      default:
        throw Error('Invalid persist mode');
    }
    return new PersistorSingleton(class_map);
  }
}

module.exports = { PersistorProvider };
