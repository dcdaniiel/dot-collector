const { PersistedEntity } = require('../base');

class Attribute extends PersistedEntity {
  static getEntityClass() {
    return Attribute;
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
      const attribute = new Attribute(serialized.name);
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

module.exports = Attribute;
