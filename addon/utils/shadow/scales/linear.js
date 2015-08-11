/*
 Accepts a range, domain and a hash of options and returns a function that converts
 a provided value into the output range.
 */
export default function shadowScalesLinear(range, domain, options) {
  let {clamp} = options;
  let [r0, r1] = range;
  let [d0, d1] = domain;
  let rDelta = r1 - r0;
  let dDelta = d1 - d0;

  return function(val) {
    if(dDelta === 0 || rDelta === 0) {
      return 0;
    } else {
      return (val - d0) / dDelta * rDelta + r0;
    }
  };
}
