import Ember from 'ember';
import scale from '../../mixins/e3-scale';
import ordinal from '../../utils/shadow/scales/ordinal';

export default Ember.Component.extend(scale, {
  name: 'ordinal',

  /*
   These are optional parameters.
   */
  attrs: {
    sort: null,
    banding: false,
    padding: 0,
    outerPadding: 0
  },

  generateScale(range, domain) {
    return ordinal(range, domain, {
      sort: this.getAttr('sort'),
      banding: this.getAttr('banding'),
      padding: this.getAttr('padding'),
      outerPadding: this.getAttr('outerPadding')
    });
  }
});
