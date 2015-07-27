import Ember from 'ember';
const {keys} = Object;

/*
 Given two hashes with the same properties and a progress percent, return a new
 hash that represents the values at that progress point.

 For now, we're only supporting numbers.
 */
export default function interpolate(hashA, hashB, percent = 0) {
  var resHash = {};
  keys(hashA).forEach(key => {
    let a = hashA[key];
    let b = hashB[key];
    resHash[key] = a === b ? a : numberInterpolate(hashA[key], hashB[key], percent);
  });
  return resHash;
}

function numberInterpolate(valA, valB, percent) {
  return (valB - valA) * percent + valA;
}