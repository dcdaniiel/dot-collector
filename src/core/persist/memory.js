const _ = require('lodash');
const assert = require('assert');
const {
  Users,
  Events,
  Attributes,
  Evaluations,
  Accounts,
} = require('../collector');

class MemoryPersist {
  constructor(class_) {
    this._store = {};
    this._class = class_;
  }

  async save(obj) {
    if (obj.id in this._store) {
      await this._update(obj.id, obj);
      return 'update';
    }
    await this._create(obj);
    return 'create';
  }

  async get(obj_id) {
    return this._store[obj_id];
  }

  async getAll() {
    return Object.values(this._store);
  }

  async first() {
    const first = await this.getAll();
    return first[0];
  }

  async delete(obj_id) {
    const ret = this._store[obj_id] ? 1 : 0;
    delete this._store[obj_id];
    return ret;
  }

  async deleteAll() {
    const ret = _.keys(this._store).length;

    this._store = {};
    return ret;
  }

  async _create(obj) {
    this._store[obj.id] = _.cloneDeep(obj);
  }

  async _update(obj_id, obj) {
    assert(obj_id in this._store);
    this._store[obj_id] = _.cloneDeep(obj);
  }
}

class UsersMemoryPersist extends MemoryPersist {
  get instance() {
    return this._instance;
  }

  set instance(instance) {
    this._instance = instance;
  }

  constructor() {
    super(Users);
    if (UsersMemoryPersist.instance) {
      return UsersMemoryPersist.instance;
    }

    UsersMemoryPersist.instance = this;
  }

  async _create(obj) {
    try {
      this._store[obj.id] = _.cloneDeep(obj);
      await new Accounts(obj.id).save();
    } catch (e) {
      console.log('user _create: ', e);
    }
  }
}

class EventsMemoryPersist extends MemoryPersist {
  get instance() {
    return this._instance;
  }

  set instance(instance) {
    this._instance = instance;
  }

  constructor() {
    super(Events);
    if (EventsMemoryPersist.instance) {
      return EventsMemoryPersist.instance;
    }

    EventsMemoryPersist.instance = this;
  }
}

class AttributesMemoryPersist extends MemoryPersist {
  get instance() {
    return this._instance;
  }

  set instance(instance) {
    this._instance = instance;
  }

  constructor() {
    super(Attributes);
    if (AttributesMemoryPersist.instance) {
      return AttributesMemoryPersist.instance;
    }

    AttributesMemoryPersist.instance = this;
  }
}

class EvaluationsMemoryPersist extends MemoryPersist {
  get instance() {
    return this._instance;
  }

  set instance(instance) {
    this._instance = instance;
  }

  constructor() {
    super(Evaluations);

    if (EvaluationsMemoryPersist.instance) {
      return EvaluationsMemoryPersist.instance;
    }

    EvaluationsMemoryPersist.instance = this;
  }
}

class AccountsMemoryPersist extends MemoryPersist {
  get instance() {
    return this._instance;
  }

  set instance(instance) {
    this._instance = instance;
  }

  constructor() {
    super(Accounts);

    if (AccountsMemoryPersist.instance) {
      return AccountsMemoryPersist.instance;
    }

    AccountsMemoryPersist.instance = this;
  }

  getAccountUser(user_id) {
    return Object.values(this._store).find((acc) => acc.user_id === user_id);
  }
}

module.exports = {
  MemoryPersist,
  UsersMemoryPersist,
  EventsMemoryPersist,
  AttributesMemoryPersist,
  EvaluationsMemoryPersist,
  AccountsMemoryPersist,
};
