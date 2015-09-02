import Ember from 'ember';

export function e3FixedRange(params, hash) {
  var min = hash['min'] || 0;
  var max = hash['max'] || 100;
  return [min, max];
}

export default Ember.Helper.helper(e3FixedRange);
