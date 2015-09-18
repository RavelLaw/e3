import Ember from 'ember';
import layout from '../templates/components/e3-collection';
const {get} = Ember;

let e3Collection = Ember.Component.extend({
  layout: layout,
  data: {},

  /*
   We should only yield the first item and then capture which "register" events
   are created. Then, we can re-create those register events for each of the subsequent
   items in the array.

   - Then, we need to update ALL
   - Keep a Map internally of all the objects; need to determine which are new, which are
     going away, etc.
   */

  // Methods that need to be handled
  getType() {
    return this.getAttr('_e3Context').getType();
  },

  register(child) {
    let iterable = this.getAttr('iterable');
    let item = get(iterable, 'firstObject');

    child.getDataContext = function() {
      return item;
    };

    console.log('registering child!',
      child.generateState('enterState'),
      child.generateState('activeState')
    );
  },

  unregister(child) {

  },

  addToQueue() {

  },


  // Then we'll need to handle this stuff, but for an array of items.
  /*
   Generate the shadow object.
   */
  generateShadowObject(contextType, attrs) {
    // let shadow = new Renderable(this, get(this, 'shadowType'), contextType, attrs);
    // set(this, 'shadow', shadow);
  },

  /*
   Update the attributes on the shadow object.
   */
  updateShadowObject(attrs) {
    // get(this, 'shadow').setAttributes(attrs);
  }
});

e3Collection.reopenClass({
  positionalParams: ['_e3Context', 'iterable']
});

export default e3Collection;
