const {cos, sin} = Math;

export function multiply(A, B) {
  let result = [];
  result[0] = A[0] * B[0] + A[1] * B[3] + A[2] * B[6];
  result[1] = A[0] * B[1] + A[1] * B[4] + A[2] * B[7];
  result[2] = A[0] * B[2] + A[1] * B[5] + A[2] * B[8];
  result[3] = A[3] * B[0] + A[4] * B[3] + A[5] * B[6];
  result[4] = A[3] * B[1] + A[4] * B[4] + A[5] * B[7];
  result[5] = A[3] * B[2] + A[4] * B[5] + A[5] * B[8];
  result[6] = A[6] * B[0] + A[7] * B[3] + A[8] * B[6];
  result[7] = A[6] * B[1] + A[7] * B[4] + A[8] * B[7];
  result[8] = A[6] * B[2] + A[7] * B[5] + A[8] * B[8];
  return result;
}

export function identity() {
  return [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ];
}

export function translate(matrix, dx, dy) {
  return multiply(matrix, [
    1, 0, dx,
    0, 1, dy,
    0, 0, 1
  ]);
}

export function rotate(matrix, radians) {
  let c = cos(radians);
  let s = sin(radians);
  return multiply(matrix, [
    -c, -s, 0,
    s, c, 0,
    0, 0, 1
  ]);
}

export function scale(matrix, sx, sy) {
  return multiply(matrix, [
    sx, 0, 0,
    0, sy, 0,
    0, 0, 1
  ]);
}

/*
 Make sure we can output the correct order for svg matrix transforms.
 */
export function toArray(matrix) {
  let [a,b,c,d,e,f] = matrix;
  return [_s(a),_s(d),_s(b),_s(e),_s(c),_s(f)];
}

function _s(val) {
  return parseFloat(val.toFixed(3));
}

export default {
  multiply: multiply,
  scale: scale,
  identity: identity,
  translate: translate,
  rotate: rotate,
  toArray: toArray
};