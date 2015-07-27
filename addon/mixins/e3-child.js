import Ember from 'ember';
const {on, get, set} = Ember;

export default Ember.Mixin.create({
  /*
   Don't render anything.
   */
  tagName: '',

  /*
    The name of the class to lookup.
   */
  renderableName: null,

  /*
   The renderable object that can be added.
   */
  renderable: null,

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

  init() {
    this._super();
    let renderableName = get(this, 'renderableName');
    let renderable = this.container.lookupFactory('renderable:'+renderableName).create();
    set(this, 'renderable', renderable);
  }
});
