import Ember from 'ember';
import scale from '../../mixins/e3-scale';

export default Ember.Component.extend(scale, {
  name: 'linear',

  /*
   These are optional parameters for how to
   */
  attrs: {
    clamp: false,
  },

  generateScale(range, domain) {
    let [r0, r1] = range;
    let [d0, d1] = domain;
    let rDelta = r1 - r0;
    let dDelta = d1 - d0;
    // val is in the domain -> range is output
    return function(val) {
      if(dDelta === 0 || rDelta === 0) {
        return 0;
      } else {
        return (val - d0) / dDelta * rDelta + r0;
      }
    };
  }
});
