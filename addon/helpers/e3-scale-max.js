import Ember from 'ember';
const {max} = Math;

export function e3ScaleMax(params, options) {
  let [scale] = params;
  let {minus, add} = options;
  if(scale && scale.range) {
    let maxValue = max.apply(null, scale.range);
    if(minus) {
      maxValue -= minus;
    }

    if(add) {
      maxValue += add;
    }

    return maxValue;
  }
}

export default Ember.Helper.helper(e3ScaleMax);
