import Ember from 'ember';

export default Ember.Controller.extend({
  showThird: false,

  domain: [0,100],
  range: [0,200],

  actions: {
    addThird() {
      this.toggleProperty('showThird');
    }
  }
});