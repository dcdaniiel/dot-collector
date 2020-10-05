const db = require('./core/db');
const { PersistorProvider } = require('./core/persist/provider');
const { Users } = require('./core/collector/users');

class TestPersist {
  constructor(persis_mode, args) {
    if (TestPersist.instance) {
      return TestPersist.instance;
    }

    PersistorProvider.getPersistor(persis_mode, args);
    TestPersist.instance = this;
  }

  async saveUser() {
    const user = await new Users(
      'Daniel',
      'daniel@gmail.com',
      '1996-07-19',
      'MYPASSWD'
    );

    return user.save();
  }
}

const test = new TestPersist('knex', db);
test.saveUser();
