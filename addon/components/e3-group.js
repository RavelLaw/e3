import Ember from 'ember';
import layout from '../templates/components/e3-container';
import Group from '../utils/shadow/group';
import e3AnimatedChild from '../mixins/e3-animated-child';
import meta from '../mixins/e3-meta';
const {get, set} = Ember;

export default Ember.Component.extend(e3AnimatedChild, meta, {
  shadowType: 'group',
  layout: layout,

  enterState: {
    x: 0
  },

  activeState: {
    x: 300
  },

  /*
   We want to be able to yield the transform of this group.
   */
  matrix: null,

  /*
   Generate the shadow object.
   */
  generateShadowObject(contextType, attrs) {
    let shadow = new Group(this, 'group', contextType, attrs);
    set(this, 'shadow', shadow);
  },

  /*
   Since this is both a context and a child, override the behaviors.
   */
  register(child) {
    get(this, 'shadow').add(get(child, 'shadow'));
  },

  unregister(child) {
    get(this, 'shadow').remove(get(child, 'shadow'));
  },

  addToQueue(callback) {
    return this.getAttr('context').addToQueue(callback);
  }
});
