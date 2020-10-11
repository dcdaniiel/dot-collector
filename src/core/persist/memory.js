const _ = require('lodash');
const assert = require('assert');
const { Users } = require('../collector');

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
}

class EventsMemoryPersist extends MemoryPersist {
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
}

module.exports = {
  MemoryPersist,
  UsersMemoryPersist,
  EventsMemoryPersist,
};
