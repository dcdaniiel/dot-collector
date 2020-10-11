const {
  UserKnexPersist: UsersKnexPersist,
  EventKnexPersist: EventsKnexPersist,
  AttributeKnexPersist: AttributesKnexPersist,
} = require('./knex');
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
          Users: [UsersKnexPersist, db],
          Events: [EventsKnexPersist, db],
          Attributes: [AttributesKnexPersist, db],
        };
        break;
      case 'memory':
        class_map = {
          Users: [UsersMemoryPersist],
          Events: [EventsMemoryPersist],
          Attributes: [EventsMemoryPersist],
        };
        break;
      default:
        throw Error('Invalid persist mode');
    }
    return new PersistorSingleton(class_map);
  }
}

module.exports = { PersistorProvider };
