import Ember from 'ember';
const {get, assert} = Ember;
const {keys} = Object;

export default Ember.Mixin.create({
  /*
   Don't render anything directly.
   */
  tagName: '',

  /*
   The first positional argument is the name of the scale
   */
  positionalParams: ['context', 'name'],

  /*
   The attributes that need to be passed to this component.
   */
  attrs: {
    context: null,
    name: null,
    range: null,
    domain: null,
    invert: false
  },

  /*
   An overwritable hook for getting the range, in case the scale component needs to
   do something to this.
   */
  getRange() {
    let range = this.getAttr('range');
    if(this.getAttr('invert')) {
      range = range.slice(0).reverse();
    }
    return range;
  },

  /*
   An overwritable hook for getting the domain, in case the scale component needs to
   do something to this.
   */
  getDomain() {
    return this.getAttr('domain');
  },

  /*
   This hook executes whenever the data changes and would have triggered a render (if
   there was actually anything to render).
   */
  didRender() {
    let range = this.getRange();
    let domain = this.getDomain();
    this.getAttr('context').updateMeta('scales', this.getAttr('name'), this._generateScale(range, domain));
  },

  /*
   Remove this item from the container's meta hash.
   */
  willDestroyElement() {
    this.getAttr('context').removeMeta('scales', this.getAttr('name'));
  },

  /*
   The private hook for generating the scale, which runs both the generate scale
   and add attributes hook to the scale.
   */
  _generateScale(range, domain) {
    let scale = this.generateScale(range, domain);
    let attrs = this.generateScaleAttrs(range, domain);
    assert('The result of the generateScale method must be a function', typeof scale === 'function');
    keys(attrs).forEach(key => {
      scale[key] = attrs[key];
    });
    return scale;
  },

  /*
    Hook that generates the scale object.
   */
  generateScale(/*range, domain*/) {},

  /*
    Hook that returns a hash of properties and/or methods that are
    added to the properties on the scale method.
   */
  generateScaleAttrs(range, domain) {
    return {
      range: range,
      domain: domain
    };
  }
});