const { PersistedEntity } = require('../base');

class Attributes extends PersistedEntity {
  static getEntityClass() {
    return Attributes;
  }

  static serialize(attribute) {
    return {
      id: attribute._id,
      created_at: attribute._created_at,
      name: attribute._name,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const attribute = new Attributes(serialized.name);
      attribute._id = serialized.id;
      attribute._created_at = serialized.created_at;

      return attribute;
    }

    return undefined;
  }

  constructor(name) {
    super();

    this._name = name;
  }
}

module.exports = Attributes;
