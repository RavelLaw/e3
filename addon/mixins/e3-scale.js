import Ember from 'ember';
const {assert, isArray} = Ember;
const {keys} = Object;

export default Ember.Mixin.create({
  /*
   Don't render anything directly.
   */
  tagName: '',

  /*
   The attributes that need to be passed to this component.
   */
  attrs: {
    context: null,
    name: null,
    range: null,
    domain: null,
    invert: false,
    'start-offset': 0,
    'end-offset': 0
  },

  /*
   An overwritable hook for getting the range, in case the scale component needs to
   do something to this.
   */
  getRange() {
    let range = this.getAttr('range');
    let startOffset = this.getAttr('start-offset');
    let endOffset = this.getAttr('end-offset');

    /*
     If just a value is provided for the range, we should
     just assume that's meant to be the max value.
     */
    if(!isArray(range)) {
      range = [0, range || 1];
    }

    // If there are offsets provided (to give space for things like axes),
    // apply those to the range.
    if(startOffset) {
      range[0] = range[0] + startOffset;
    }

    if(endOffset) {
      console.log(range[1], range);
      range[1] = range[1] - endOffset;
    }

    // Reverse the range as necessart
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
    this.getAttr('_e3Context').updateMeta('scales', this.getAttr('name'), this._generateScale(range, domain));
  },

  /*
   Remove this item from the container's meta hash.
   */
  willDestroyElement() {
    this.getAttr('_e3Context').removeMeta('scales', this.getAttr('name'));
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
