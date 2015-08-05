import Ember from 'ember';
const {isArray} = Ember;
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
export default function interpolate(hashA, hashB, percent = 0) {
  var resHash = {};
  keys(hashA).forEach(key => {
    let a = hashA[key];
    let b = hashB[key];
    if(isArray(a)) {
      resHash[key] = a.map((aVal, index) => {
        return interpolatePrimitives(aVal, b[index], percent);
      });
    } else {
      resHash[key] = interpolatePrimitives(a, b, percent);
    }

  });
  return resHash;
}

function interpolatePrimitives(valA, valB, percent) {
  // Determine the type of valA.
  // TODO: Support more than just numbers.

  // First, no-op if equal.
  if(valA === valB) {
    return valA;
  } else {
    return numberInterpolate(valA, valB, percent);
  }
}

function numberInterpolate(valA, valB, percent) {
  return (valB - valA) * percent + valA;
}