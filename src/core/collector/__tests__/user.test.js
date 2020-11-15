const _ = require('lodash');
const { PersistorProvider } = require('../../persist/provider');
const { User, Account } = require('../index');
const { persist_options } = require('../../../../settings/persist_options');

const _clean = async () => {
  const persistor = PersistorProvider.getPersistor(...persist_options);
  const user = persistor.getPersistInstance('User');
  const account = persistor.getPersistInstance('Account');

  await account.deleteAll();
  await user.deleteAll();
};

beforeEach(async () => {
  await _clean();
});

afterAll(async () => {
  await _clean();
  if (persist_options[0] === 'knex') {
    await User.getPersist()._db.destroy();
  }
});

describe('User', () => {
  it('constructor works', async () => {
    const user = new User('testName', 'testEmail@t.com', '2020-09-01', '123');
    expect(user).toBeInstanceOf(User);
  });

  it('save user', async () => {
    const user = new User('testName', 'testEmail@t.com', '2020-09-01', '123');
    const saved_user = await user.save();

    expect(saved_user.id).toBe(user.id);
  });

  it('fetch user', async () => {
    let usr = new User('testName', 'testEmail@t.com', '2020-09-01', '123');
    usr = await usr.save();

    let fetchUser = await User.fetch(usr.id);
    expect(fetchUser._id).toBe(usr.id);
    await User.delete(usr.id);
    fetchUser = await User.fetch(usr.id);
    expect(fetchUser).toBeFalsy();
  });

  it('delete user', async () => {
    let user = new User('testName', 'testEmail@t.com', '2020-09-01', '123');
    user = await user.save();

    let fetched_user = await User.fetch(user.id);

    expect(fetched_user._id).toBe(user.id);
    await User.delete(user.id);
    fetched_user = await User.fetch(user.id);
    expect(fetched_user).toBeFalsy();
  });

  it('should create a user and account with user id', async () => {
    let user = new User('testName', 'test@test.com', '', '');
    user = await user.save();

    let account = await new Account().getPersist();
    account = await account.getAccountUser(user.id);

    expect(user.id).toBe(account.user_id);
  });
});
