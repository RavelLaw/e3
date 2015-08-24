import Ember from 'ember';
import utilE3Ticks from '../utils/e3-ticks';

export function e3Ticks(params, hash) {
  let ticks = hash.ticks || 10;
  let [domain] = params;
  console.log(domain, ticks);
  return utilE3Ticks(domain, ticks);
}

export default Ember.Helper.helper(e3Ticks);
