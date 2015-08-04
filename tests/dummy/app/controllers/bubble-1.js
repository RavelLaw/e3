import Ember from 'ember';

export default Ember.Controller.extend({
  isPaddeder: false,
  actions: {
    togglePaddeder() {
      this.toggleProperty('isPaddeder');
    }
  }
});
