import Ember from 'ember';
import Renderable from '../utils/shadow/renderable';
const {on, get, set} = Ember;

export default Ember.Mixin.create({
  /*
   Don't render anything.
   */
  tagName: '',

  /*
    The name of the shadow type to lookup.
   */
  shadowType: null,

  /*
   The shadow object that can be added.
   */
  shadow: null,

  /*
   Add the public attributes for this child
   */
  attrs: {
    context: null
  },

  /*
   Get the type
   */
  getType() {
    return this.getAttr('context').getType();
  },

  /*
    Regsiter self to its parent.
   */
  registerToContext() {
    this.getAttr('context').register(this);
  },

  /*
   Generate the shadow object.
   */
  generateShadowObject(contextType, attrs) {
    let shadow = new Renderable(this, get(this, 'shadowType'), contextType, attrs);
    set(this, 'shadow', shadow);
  },

  /*
   Update the attributes on the shadow object.
   */
  updateShadowObject(attrs) {
    get(this, 'shadow').setAttributes(attrs);
  },

  /*
   Destroy the shadow object.
   */
  unregister() {
    this.getAttr('context').unregister(this);
  }
});
