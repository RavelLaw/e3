import Ember from 'ember';
let twoPI = 2 * Math.PI;

export function e3RadianRange(params, hash = {}) {
  let startPercent = 'start' in hash ? hash.start : 0;
  let endPercent = 'end' in hash ? hash.end : 1;
  return [startPercent * twoPI, endPercent * twoPI];
}

export default Ember.Helper.helper(e3RadianRange);
