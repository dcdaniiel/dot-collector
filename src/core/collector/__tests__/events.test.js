const _ = require('lodash');
const { PersistorProvider } = require('../../persist/provider');
const { Event } = require('../index');
const { persist_options } = require('../../../../settings/persist_options');

const _clean = async () => {
  const persistor = PersistorProvider.getPersistor(...persist_options);
  const evt = persistor.getPersistInstance('Event');

  await evt.deleteAll();
};

beforeEach(async () => {
  await _clean();
});

afterAll(async () => {
  if (persist_options[0] === 'knex') {
    await Event.getPersist()._db.destroy();
  }
});

describe('Events', () => {
  it('constructor works', async () => {
    const evt = new Event('testEvent');
    expect(evt).toBeInstanceOf(Event);
  });

  it('save Event', async () => {
    const evt = new Event('testEvent');
    const saved_Event = await evt.save();

    expect(saved_Event.id).toBe(evt.id);
  });

  it('fetch Event', async () => {
    let evt = new Event('testEvent');
    evt = await evt.save();

    let fetchUser = await Event.fetch(evt.id);
    expect(fetchUser._id).toBe(evt.id);
    await Event.delete(evt.id);
    fetchUser = await Event.fetch(evt.id);
    expect(fetchUser).toBeFalsy();
  });

  it('delete Event', async () => {
    let evt = new Event('testEvent');
    evt = await evt.save();

    let fetched_Event = await Event.fetch(evt.id);

    expect(fetched_Event._id).toBe(evt.id);
    await Event.delete(evt.id);
    fetched_Event = await Event.fetch(evt.id);
    expect(fetched_Event).toBeFalsy();
  });
});
