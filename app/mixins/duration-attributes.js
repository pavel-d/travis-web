import Ember from 'ember';
import attr from 'ember-data/attr';
import { computed } from 'ember-decorators/object';

export default Ember.Mixin.create({
  _startedAt: attr(),
  _finishedAt: attr(),

  @computed('_startedAt', 'notStarted')
  startedAt(startedAt, notStarted) {
    if (!notStarted) {
      return startedAt;
    }
  },

  @computed('_finishedAt', 'notStarted')
  finishedAt(finishedAt, notStarted) {
    if (!notStarted) {
      return finishedAt;
    }
  },
});
