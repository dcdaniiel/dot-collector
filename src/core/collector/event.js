const { PersistedEntity } = require('../base');

class Event extends PersistedEntity {
  static getEntityClass() {
    return Event;
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
      const event = new Event(serialized.name);
      event._id = serialized.id;
      event._created_at = serialized.created_at;

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

module.exports = Event;
