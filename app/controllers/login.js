import Ember from 'ember';

import config from 'ember-get-config';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),
    queryParams: ['driver'],
    driver: 'jam-auth',
    modal: false,

    actions: {
        authenticate(attrs) {
            var me = this;
            var target = me.get('target');
            me.get('session').authenticate('authenticator:jam-jwt',attrs).then(
                function() {
                    target.transitionTo('home');
                }, function() {
                    me.send('toggleUserNotFound');
                }
            );
        },
        toggleUserNotFound() {
            this.toggleProperty('userNotFound');
        },
        createAccount(attrs) {
            var newAccount = this.store.createRecord('account', {
                username: attrs.username,
                password: attrs.password,
                email: attrs.email,
                profiles: [],
                // Update the line below to be more general
                id: `${config.JAMDB.namespace}.accounts.${attrs.username}`
            });
            newAccount.save().then(() => {
                // log in immediately with this new account information
                var theAttrs = {provider: 'self', namespace: config.JAMDB.namespace, collection: 'accounts', username: attrs.username, password: attrs.password};
                this.send('authenticate', theAttrs);
            }, () => {
                this.send('toggleUserConflict');
            });
        },
        toggleUserConflict() {
            this.toggleProperty('userConflict');
        }
    }
});
