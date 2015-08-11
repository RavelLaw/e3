import Ember from 'ember';
import scale from '../../mixins/e3-scale';
import linear from '../../utils/shadow/scales/linear';

export default Ember.Component.extend(scale, {
  name: 'linear',

  /*
   These are optional parameters.
   */
  attrs: {
    clamp: false,
    round: false
  },

  generateScale(range, domain) {
    return linear(range, domain, {
      clamp: this.getAttr('clamp'),
      round: this.getAttr('round')
    });
  }
});
