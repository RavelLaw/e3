import Ember from 'ember';

export function temperatureFormat(params/*, hash*/) {
  let [val] = params;
  return val.toFixed(2)+'F';
}

export default Ember.Helper.helper(temperatureFormat);
