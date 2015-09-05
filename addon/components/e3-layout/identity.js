import Ember from 'ember';
import layout from '../e3-layout';


/*
 This is more or less a utility layout that will take x & y scales and
 create a layour for objects based on that layout.
 */
export default layout.extend({
  name: 'identity',

  attrs: {
    x: null,
    y: null
  },

  generateItemLayout(item) {
    let xScale = this.getAttr('x');
    let yScale = this.getAttr('y');

    if(!xScale || !yScale) {
      return;
    }

    return {
      x: xScale(item),
      y: yScale(item)
    };
  }
});
