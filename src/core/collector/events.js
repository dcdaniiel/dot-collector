const { PersistedEntity } = require('../base');

class Events extends PersistedEntity {
  static getEntityClass() {
    return Events;
  }

  static serialize(event) {
    return {
      id: event._id,
      created_at: event._created_at,
      name: event._name,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const event = new Events(serialized.name);
      event._id = serialized.id;
      event._created_at = serialized.id;

      return event;
    }
    return undefined;
  }

  constructor(name) {
    super();

    this._name = name;
  }

  get name() {
    return this._name;
  }
}

module.exports = Events;
