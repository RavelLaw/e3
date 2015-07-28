import Ember from 'ember';
import layout from '../templates/components/e3-group';
import Group from '../utils/shadow/group';
import e3AnimatedChild from '../mixins/e3-animated-child';
const {get, set, computed} = Ember;

/*
 A group should yield itself for registration as well as its transformation matrix.
 Then, we don't need to actually render the groups themselves!
 */
export default Ember.Component.extend(e3AnimatedChild, {
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
