import Ember from 'ember';
const {isArray, typeOf} = Ember;
const {keys} = Object;

/*
 Given two hashes with the same properties and a progress percent, return a new
 hash that represents the values at that progress point.

 For now, we're only supporting numbers. This needs lots of work to support other types of
 interpolate-able values.
 [X] Arrays
 [ ] Colors (rgb, hex, hsl?)
 [ ] Custom Interpolators?
 [ ]
 */
export default function interpolate(fromVal, toVal, percent = 0) {
  let type = typeOf(fromVal);

  switch(type) {
    case 'object':
      return interpolateHash(fromVal, toVal, percent);
    case 'array':
      return interpolateArray(fromVal, toVal, percent);
    case 'string':
      // TODO: String Interpolation. Detect Colors/other interpolate-able strings
      return toVal;
    case 'number':
      return interpolateNumber(fromVal, toVal, percent);
  }
}

function interpolateHash(hashA, hashB, percent) {
  var resHash = {};

  keys(hashA).forEach(key => {
    let a = hashA[key];
    let b = hashB[key];
    resHash[key] = interpolate(a,b,percent);
  });
  return resHash;
}

function interpolateArray(arrA, arrB, percent) {
  let aLength = arrA.length;
  let bLength = arrB.length;
  let sharedLength = Math.min(arrA.length, arrB.length);
  let result = [];
  let i = 0;

  // First, interpolate the items among the shared length.
  for (; i < sharedLength; i++) {
    result.push(interpolate(arrA[i], arrB[i], percent));
  };

  // Then continue to the max length of the other arrays (if applicable)
  for(; i < aLength; i++) {
    result.push(arrA[i]);
  }

  for(; i < bLength; i++) {
    result.push(arrB[i]);
  }

  return result;
}

function interpolateNumber(valA, valB, percent) {
  // First, no-op if equal.
  if(valA === valB) {
    return valA;
  } else {
    return (valB - valA) * percent + valA;
  }
}