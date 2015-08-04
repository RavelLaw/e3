import Ember from 'ember';
import layout from '../templates/components/e3-stacked-each';
const {copy, get, set} = Ember;

/*
 We should also make this inherit from the e3-group so that we can
 apply transformations to this object. Crucial for Stacked bar charts. :)
 */
export default Ember.Component.extend({
  layout: layout,
  tagName: '',

  positionalParams: ['data'],

  attrs: {
    data: null,
    'sum-props': null
  },

  summedArray: null,

  didReceiveAttrs() {
    let result = [];
    let sums = {};
    let data = this.getAttr('data');
    let props = this.getAttr('sum-props').split(' ');

    // Initialize the sum props.
    props.forEach(prop =>  {
      sums[prop] = 0;
    });

    // Build the array
    data.forEach(item => {
      // Push the object.
      result.push({
        data: item,
        sum: sums
      });

      // Copy the sums object.
      let curSums = copy(sums);

      // Add the new values onto the sums.
      props.forEach(prop => {
        let prevVal = get(sums, prop);
        let val = get(item, prop);
        curSums[prop] = prevVal + val;
      });

      // Make available for the next iteration.
      sums = curSums;
    });

    set(this, 'summedArray', result);
  }
});
