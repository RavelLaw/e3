import scale from '../e3-scale';
import linear from '../../utils/shadow/scales/linear';

export default scale.extend({
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
