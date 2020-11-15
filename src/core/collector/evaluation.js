const { PersistedEntity } = require('../base');

class EvaluationsStatus {
  static ACTIVE() {
    return 'active';
  }

  static DELETED() {
    return 'deleted';
  }

  static UPDATED() {
    return 'updated';
  }
}

class Evaluation extends PersistedEntity {
  static getEntityClass() {
    return Evaluation;
  }

  static serialize(evaluation) {
    return {
      id: evaluation._id,
      event_id: evaluation._event_id,
      evaluator_id: evaluation._evaluator_id,
      rated_id: evaluation._rated_id,
      attribute_id: evaluation._attribute_id,
      description: evaluation._description,
      note: evaluation._note,
      status: evaluation._status,
      created_at: evaluation._created_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const data = new Evaluation(
        serialized.evaluator_id,
        serialized.rated_id,
        serialized.event_id,
        serialized.attribute_id,
        serialized.note
      );

      data._id = serialized.id;
      data._created_at = serialized.created_at;
      data._description = serialized.description;
      data._status = serialized.status;

      return data;
    }
    return undefined;
  }

  constructor(evaluator_id, rated_id, event_id, attributes_id, note) {
    super();

    this._evaluator_id = evaluator_id;
    this._rated_id = rated_id;
    this._event_id = event_id;
    this._attribute_id = attributes_id;
    this._note = note;
    this._status = EvaluationsStatus.ACTIVE();
  }

  set description(description) {
    this._description = description;
  }

  set status(status) {
    this._status = status;
  }
}

module.exports = { Evaluation, EvaluationsStatus };