import Ember from 'ember';
const {get, set} = Ember;

export default Ember.Controller.extend({
  showThird: false,

  actions: {
    addThird() {
      this.toggleProperty('showThird');
    }
  }
});