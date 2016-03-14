
import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
    session: service('session'),
    sessionAccount: service('session-account'),
    queryString: 'Active',
    queryTypes: ['state','eligibilityCriteria'],
    queryType: 'state'
});