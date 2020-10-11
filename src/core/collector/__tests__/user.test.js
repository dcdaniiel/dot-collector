const _ = require('lodash');
const { PersistorProvider } = require('../../persist/provider');
const Users = require('../users');

beforeEach(async () => {
  const persistor = PersistorProvider.getPersistor('memory');
  const user = persistor.getPersistInstance('Users');
  user.deleteAll();
});

describe('User', () => {
  it('constructor works', async () => {
    const user = new Users('testName', 'testEmail@t.com', '2020-09-01', '123');
    expect(user).toBeInstanceOf(Users);
  });

  it('save user', async () => {
    const user = new Users('testName', 'testEmail@t.com', '2020-09-01', '123');
    const saved_user = await user.save();

    expect(saved_user.id).toBe(user.id);
  });

  it('fetch user', async () => {
    let user = new Users('testName', 'testEmail@t.com', '2020-09-01', '123');
    user = await user.save();

    let fetchUser = await Users.fetch(user.id);
    expect(fetchUser._id).toBe(user.id);
    await Users.delete(user.id);
    fetchUser = await Users.fetch(user.id);
    expect(fetchUser).toBeFalsy();
  });

  it('delete user', async () => {
    let user = new Users('testName', 'testEmail@t.com', '2020-09-01', '123');
    user = await user.save();

    let fetched_user = await Users.fetch(user.id);

    expect(fetched_user._id).toBe(user.id);
    await Users.delete(user.id);
    fetched_user = await Users.fetch(user.id);
    expect(fetched_user).toBeFalsy();
  });
});
