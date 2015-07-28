import Ember from 'ember';
const {get} = Ember;

export function e3Unique(params, hash) {
  let arr = params[0];
  let key = hash.key;
  let seen = {};
  let index = -1;
  let length = arr.length;
  let result = [];

  while(++index < length) {
    let cur = key ? get(arr[index], key) : arr[index];
    if(!seen[cur]) {
      result.push(cur);
      seen[cur] = true;
    }
  }

  return result;
}

export default Ember.Helper.helper(e3Unique);
