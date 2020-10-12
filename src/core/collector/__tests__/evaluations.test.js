const { PersistorProvider } = require('../../persist/provider');
const {
  Evaluations,
  EvaluationsStatus,
  Users,
  Attributes,
  Events,
} = require('..');
const { persist_options } = require('../../settings');

const _clean = () => {
  const persistor = PersistorProvider.getPersistor(...persist_options);
  const Evaluation = persistor.getPersistInstance('Evaluations');
  const Attribute = persistor.getPersistInstance('Attributes');
  const Event = persistor.getPersistInstance('Events');
  const UserInstance = persistor.getPersistInstance('Users');
  const Account = persistor.getPersistInstance('Accounts');

  Account.deleteAll();
  Evaluation.deleteAll();
  Event.deleteAll();
  Attribute.deleteAll();
  UserInstance.deleteAll();
};

beforeEach(async () => {
  await _clean();

  await new Users('test', 'a@g.com', '', '').save();
  await new Users('teste2', 'b@g.com', '', '').save();
  await new Events('eventName').save();
  await new Attributes('attributeName').save();
});

afterAll(async () => {
  await _clean();
  if (persist_options[0] === 'knex') {
    await Evaluations.getPersist()._db.destroy();
  }
});

describe('Evaluations', () => {
  it('constructor works', async () => {
    const Evaluation = new Evaluations();
    Evaluation.description = 'description test';
    expect(Evaluation).toBeInstanceOf(Evaluations);
  });

  it('should create a evaluation', async () => {
    const user = await Users.getPersist().getAll();
    const event = await Events.getPersist().first();
    const attribute = await Attributes.getPersist().first();

    let Evaluation = new Evaluations(
      user[0].id,
      user[1].id,
      event.id,
      attribute.id,
      9
    );
    Evaluation.description = 'description test';
    Evaluation = await Evaluation.save();

    const fetched = await Evaluations.fetch(Evaluation.id);

    expect(Evaluation.id).toBe(fetched.id);
  });

  it('should delete a evaluation', async () => {
    const user = await Users.getPersist().getAll();
    const event = await Events.getPersist().first();
    const attribute = await Attributes.getPersist().first();

    let Evaluation = new Evaluations(
      user[0].id,
      user[1].id,
      event.id,
      attribute.id,
      9
    );
    Evaluation.description = 'description test';
    Evaluation = await Evaluation.save();

    const fetched = await Evaluations.fetch(Evaluation.id);

    expect(Evaluation.id).toBe(fetched.id);
    expect(Evaluation._status).toBe(EvaluationsStatus.ACTIVE());

    Evaluation.status = EvaluationsStatus.DELETED();
    Evaluation = await Evaluation.save();

    expect(Evaluation._status).toBe(EvaluationsStatus.DELETED());
  });
});
