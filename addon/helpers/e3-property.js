import Ember from 'ember';
const {get} = Ember;

export function e3Property([key]) {
  return function(data) {
    return get(data, key);
  };
}

export default Ember.Helper.helper(e3Property);
