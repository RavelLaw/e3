import Ember from 'ember';
import layout from '../templates/components/e3-group';
import e3AnimatedChild from '../mixins/e3-animated-child';
const {get, set, computed} = Ember;

/*
 A group should yield itself for registration as well as its transformation matrix.
 Then, we don't need to actually render the groups themselves!
 */
export default Ember.Component.extend(e3AnimatedChild, {
  renderableName: 'group',
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
   Since this is both a context and a child, override the behaviors.
   */
  register(child) {
    get(this, 'renderable').add(get(child, 'renderable'));
  },

  unregister(child) {
    get(this, 'renderable').remove(get(child, 'renderable'));
  },

  addToQueue(callback) {
    return this.getAttr('context').addToQueue(callback);
  }
});
