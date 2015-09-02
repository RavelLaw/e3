import Ember from 'ember';
import scale from '../e3-scale';
import ordinal from '../../utils/shadow/scales/ordinal';
const {get} = Ember;

export default scale.extend({
  name: 'ordinal',

  /*
   These are optional parameters.
   */
  attrs: {
    sortProperty: null,
    banding: false,
    padding: 0,
    outerPadding: 0
  },

  generateScale(range, domain) {
    let sortProp = this.getAttr('sortProperty');
    let options = {
      banding: this.getAttr('banding'),
      padding: this.getAttr('padding'),
      outerPadding: this.getAttr('outerPadding')
    };

    if(sortProp) {
      options.sort = function(a, b) {
        return get(a, sortProp) - get(b, sortProp);
      };
    }

    return ordinal(range, domain, options);
  }
});
