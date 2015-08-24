import Ember from 'ember';
const {get, computed} = Ember;

export default Ember.Controller.extend({
  isPaddeder: false,
  yScalePadding: computed('isPaddeder', function() {
    return get(this, 'isPaddeder') ? 0.8 : 0.2;
  }),
  actions: {
    togglePaddeder() {
      this.toggleProperty('isPaddeder');
    }
  }
});
