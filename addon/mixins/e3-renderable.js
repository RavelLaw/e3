import Ember from 'ember';
const {computed, set, get} = Ember;

export default Ember.Mixin.create({
  /*
   The instance of the two object.
   */
  shadow: null,

  /*
    @interface
    Generate the two Object.
   */
  generateShadowObject(/* attrs */) {},

  /*
    @interface
   */
  updateShadowObject(/* twoObject, attrs */) {},

  /*
   Generate the two object.
   */
  _generateShadowObject(attrs, type) {
    let shadowObject = this.generateShadowObject(attrs, type);
    set(this, 'shadowObject', shadowObject);
  },

  /*
   Fill to the child object.
   */
  join(group) {
    get(this, 'shadowObject').join(group);
  },

  /*
   Fill to the child object.
   */
  leave(group) {
    get(this, 'shadowObject').leave(group);
  },

  /*
   */
  _update(attrs) {
    let shadow = get(this, 'shadowObject');
    return this.updateShadowObject(shadow, attrs);
  }
});
