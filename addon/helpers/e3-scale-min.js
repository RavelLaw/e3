import Ember from 'ember';
const {min} = Math;

export function e3ScaleMax(params, options) {
  let [scale] = params;
  let {minus, add} = options;
  if(scale && scale.range) {
    let minValue = min.apply(null, scale.range);
    if(minus) {
      minValue -= minus;
    }

    if(add) {
      minValue += add;
    }

    return minValue;
  }
}

export default Ember.Helper.helper(e3ScaleMax);
