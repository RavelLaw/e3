import Ember from 'ember';
const {isArray, get} = Ember;
const {keys} = Object;

export function e3BindScale(params, options) {
  let {scaleDifference, data:manualData} = options;
  let [scale, key] = params;

  if(scale) {
    var resultScale = function(data) {
      data = manualData || data;
      if(isArray(data)) {
        return data.map(item => {
          let val = key ? get(item, key) : item;
          return calculateValue(val, scale, scaleDifference);
        });
      } else {
        let val = key ? get(data, key) : data;
        return calculateValue(val, scale, scaleDifference);
      }
    };

    // Add the additional properties on this scale.
    keys(scale).forEach(key => {
      resultScale[key] = scale[key];
    });

    return resultScale;
  }
}

function calculateValue(input, scale, scaleDifference) {
  let result = scale(input);

  /*
   Inverting the output would take the
   */
  if(scaleDifference) {
    let [r0, r1] = scale.range;
    result = r1 - r0 - result;
  }

  return result;
}

export default Ember.Helper.helper(e3BindScale);
