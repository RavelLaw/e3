const {min, max, round:mathRound} = Math;
/*
 Accepts a range, domain and a hash of options and returns a function that converts
 a provided value into the output range.
 */
export default function shadowScalesLinear(range = [0,1], domain = [0,1], options = {}) {
  let {clamp, round} = options;
  let [r0, r1] = range;
  let [d0, d1] = domain;
  let rDelta = r1 - r0;
  let dDelta = d1 - d0;

  return function(val) {
    if(dDelta === 0 || rDelta === 0) {
      // Divide by 0; set as the range's origin
      return r0;
    } else {
      // Calculate the result linearly.
      let result = (val - d0) / dDelta * rDelta + r0;

      // If we should clamp the result, do it.
      if(clamp) {
        result = min(result, r1);
        result = max(r0, result);
      }

      // If we should round the number
      if(round) {
        result = mathRound(result);
      }

      return result;
    }
  };
}
