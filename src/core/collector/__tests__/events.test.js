const _ = require('lodash');
const { PersistorProvider } = require('../../persist/provider');
const { Events } = require('../index');
const { persist_options } = require('../../settings');

beforeEach(async () => {
  await _clean();
});

afterAll(async () => {
  if (persist_options[0] === 'knex') {
    await Events.getPersist()._db.destroy();
  }
});

describe('Events', () => {
  it('constructor works', async () => {
    const Event = new Events('testEvent');
    expect(Event).toBeInstanceOf(Events);
  });

  it('save Event', async () => {
    const Event = new Events('testEvent');
    const saved_Event = await Event.save();

    expect(saved_Event.id).toBe(Event.id);
  });

  it('fetch Event', async () => {
    let Event = new Events('testEvent');
    Event = await Event.save();

    let fetchUser = await Events.fetch(Event.id);
    expect(fetchUser._id).toBe(Event.id);
    await Events.delete(Event.id);
    fetchUser = await Events.fetch(Event.id);
    expect(fetchUser).toBeFalsy();
  });

  it('delete Event', async () => {
    let Event = new Events('testEvent');
    Event = await Event.save();

    let fetched_Event = await Events.fetch(Event.id);

    expect(fetched_Event._id).toBe(Event.id);
    await Events.delete(Event.id);
    fetched_Event = await Events.fetch(Event.id);
    expect(fetched_Event).toBeFalsy();
  });

  it('should not accept duplicate attribute', async () => {
    let val;
    const Event = new Events('event_duplicate');
    await Event.save();

    try {
      const Duplicate = new Events('event_duplicate');
      await Duplicate.save();
      expect(true).toBe(false);
    } catch (e) {
      const message = `insert into "events" ("created_at", "id", "name") values ($1, $2, $3) - duplicate key value violates unique constraint "events_name_unique"`;
      expect(e.message).toEqual(message);
    }
  });
});

const _clean = () => {
  const persistor = PersistorProvider.getPersistor(...persist_options);
  const Event = persistor.getPersistInstance('Events');
  Event.deleteAll();
};
