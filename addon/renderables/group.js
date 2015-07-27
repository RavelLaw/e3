import Ember from 'ember';
import renderable from '../mixins/e3-renderable';
import Group from '../utils/shadow/group';
const {get} = Ember;

export default Ember.Object.extend(renderable, {
  /*
   Create the group object.
   */
  generateShadowObject(attrs, contextType) {
    return new Group('group', contextType, attrs);
  },

  /*
   Update the group's transformations.
   */
  updateShadowObject(shadowObject, attrs) {
    shadowObject.setAttributes(attrs);
  },

  /*
   A group has special properties to add/remove its children.
   */
  add(child) {
    get(this, 'shadowObject').add(child);
  },

  /*
   Remove the group's child.
   */
  remove(child) {
    get(this, 'shadowObject').remove(child);
  }
});