const { abstractFactory } = require('../utils/abstractFactory');

class Abc {
  static get instance() {
    return Abc._instance;
  }

  static set instance(instance) {
    Abc._instance = instance;
  }

  constructor(name) {
    this._name = name;

    Abc.instance = this;
  }
}
class Abcd {
  static get instance() {
    return Abcd._instance;
  }

  static set instance(instance) {
    Abcd._instance = instance;
  }

  constructor(name) {
    this._name = name;

    Abcd.instance = this;
  }
}

class Persist {
  static get instance() {
    return Persist._instance;
  }

  static set instance(instance) {
    Persist._instance = instance;
  }

  constructor(persist_class_map = {}) {
    this._persist_class_map = persist_class_map;

    if (Persist.instance) {
      return Persist.instance;
    }

    const PersistFactory = abstractFactory(this._persist_class_map);

    this._persists = {};

    for (const [k, v] of Object.entries(this._persist_class_map)) {
      const [_, ...parameters] = v;
      this._persists[k] = PersistFactory(k, ...parameters);
    }

    Persist.instance = this;
  }

  getPersistInstance(class_) {
    return this._persists[class_];
  }

  async clear() {
    const persists = Object.values(this._persists);
    await persists.forEach(({ deleteAll }) => deleteAll());
  }
}

const PersistSingleton = new Persist({
  abc: [Abc, 'Daniel'],
  abcd: [Abcd, 'abcd'],
});

console.log(PersistSingleton);

module.exports = {
  PersistSingleton: Persist,
};
