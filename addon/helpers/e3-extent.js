import Ember from 'ember';
const {get} = Ember;

/*
 This helper takes an array as the first argument, and an optional key as the second argument.
 (e3-extent [1,2,3,4]) => [1,4]

 This also has options for how to handle this extent.
 Options {
  key => the property key of where the value sits on each of the items in the array
  padding => A percent (0-1) of the found extent to be "padded" to both ends of the extent
  min-value => The minimum possible value (clips actual values lower than it)
  max-value => The maximum possible value (clips values higher than it)
  min-delta => Forces the different between the min and max to be at least a certain value.
  nested-key => If the values are nested in an array, use this key to get the underlying values.
  nested-sum => If we should sum those nested values, or treat them as individual extremes.
 }
 */
export function e3Extent(params, hash) {
  let arr = params[0];

  if(!arr) {
    return [-Infinity, Infinity];
  }

  let key = hash.key;
  let nestedKey = hash['nested-key'];
  let nestedSum = hash['nested-sum'];
  let length = arr.length;
  let index = -1;
  let result = [Infinity, -Infinity];

  if(nestedKey) {
    let nestedArr = [];

    // Get the nested items.
    while(++index < length) {
      let parent = arr[index];
      if(nestedSum) {
        nestedArr.push(get(parent, nestedKey).reduce((prev, child) => {
          return prev + (key ? get(child, key) : child);
        }, 0));
      } else {
        nestedArr = nestedArr.concat(get(parent, nestedKey));
      }
    }

    arr = nestedArr;

    // We've already "used" the key in this case.
    if(nestedSum) {
      key = null;
    }
  }

  // Reset index and lengths for the new array.
  length = arr.length;
  index = -1;

  // Iterate over the array and figure out min/max values.
  while(++index < length) {
    // If there's a key to map, get that value.
    let cur = key ? get(arr[index], key) : arr[index];
    result[0] = Math.min(result[0], cur);
    result[1] = Math.max(result[1], cur);
  }

  // Apply the padding.
  if(hash.padding) {
    let [min, max] = result;
    let delta = (max - min) * hash.padding;
    result = [min - delta, max + delta];
  }

  // Apply the Min Delta.
  if(hash['min-delta']) {
    let [min, max] = result;
    let delta = max - min;
    if(delta < hash['min-delta']) {
      let addDelta = (hash['min-delta'] - delta) / 2;
      result = [min - addDelta, max + addDelta];
    }
  }

  // Apply the min Value
  if(hash['min-value'] !== undefined) {
    result[0] = hash['min-value'];
  }

  // Apply the max value
  if(hash['max-value'] !== undefined) {
    result[1] = hash['max-value'];
  }

  return result;
}

export default Ember.Helper.helper(e3Extent);
