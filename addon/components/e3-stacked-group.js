import Ember from 'ember';
import layout from '../templates/components/e3-stacked-group';
import group from './e3-group';
const {copy, get, set, on, guidFor} = Ember;
/*
 We should also make this inherit from the e3-group so that we can
 apply transformations to this object. Crucial for Stacked bar charts. :)
 */

export default group.extend({
  layout: layout,
  tagName: '',

  /*
   The array that is iterated against that contains the original data
   and the cumulative sums of the sum properties.
   */
  summedArray: null,

  /*
   An object that represents the total sum of all the objects.
   */
  totalObject: null,


  getDataContext() {
    return get(this, 'totalObject');
  },

  attrs: {
    'start-value': 0,
    'sum-props': null
  },

  setupSummedArray: on('didReceiveAttrs', function() {
    let result = [];
    let sums = {};
    let data = this.getAttr('data');
    let props = this.getAttr('sum-props').split(' ');
    let startVal = this.getAttr('start-value') || 0;

    // Initialize the sum props.
    props.forEach(prop =>  {
      sums[prop] = startVal;
    });

    // Build the array
    data.forEach(item => {
      // Push the object.
      result.push({
        id: guidFor(item),
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

    set(this, 'totalObject', sums);
    set(this, 'summedArray', result);
  })
});
