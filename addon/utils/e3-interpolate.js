import Ember from 'ember';
const {typeOf} = Ember;
const HEXCOLORREGEX = /^#[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}$/;
const {round, min} = Math;

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
      return interpolateString(fromVal, toVal, percent);
    case 'number':
      return interpolateNumber(fromVal, toVal, percent);
  }
}

function interpolateHash(hashA, hashB, percent) {
  let resHash = {};
  let key;

  // First, interpolate all the keys from hash A.
  for(key in hashA) {
    if(key in hashB) {
      resHash[key] = interpolate(hashA[key], hashB[key], percent);
    } else {
      resHash[key] = hashA[key];
    }
  }

  // Find any not in hash b and add that value to the result.
  for(key in hashB) {
    if(!(key in hashB)) {
      resHash[key] = hashB[key];
    }
  }

  return resHash;
}

function interpolateArray(arrA, arrB, percent) {
  let aLength = arrA.length;
  let bLength = arrB.length;
  let sharedLength = min(arrA.length, arrB.length);
  let result = [];
  let i = 0;

  // First, interpolate the items among the shared length.
  for (; i < sharedLength; i++) {
    result.push(interpolate(arrA[i], arrB[i], percent));
  }

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

function interpolateString(valA, valB, percent) {
  if(HEXCOLORREGEX.test(valA)) {
    return interpolateHexColor(valA, valB, percent);
  } else {
    return valB;
  }
}

function interpolateHexColor(valA, valB, percent) {
  let color = interpolateArray(hexToArray(valA), hexToArray(valB), percent);
  return '#'+color.map(val => round(val).toString(16)).join('');
}

function hexToArray(hexString) {
  let color = parseInt(hexString.slice(1), 16);
  let result = [];

  /*
   Do some bit shifting magic.
   Credit to D3.js
   */
  if(isNaN(color)) {
    return result;
  } else if(hexString.length === 4) {
    let r = (color & 0xf00) >> 4;
    result[0] = (r >> 4) | r;
    let g = color & 0xf0;
    result[1] = (g >> 4) | g;
    let b = color & 0xf;
    result[2] = (b << 4) | b;
  } else if(hexString.length === 7) {
    result[0] = (color & 0xff0000) >> 16;
    result[1] = (color & 0xff00) >> 8;
    result[2] = (color & 0xff);
  }

  return result;
}