import Ember from 'ember';
const {isArray, get} = Ember;
const {keys} = Object;

export function e3BindScale(params, options) {
  let {scaleDifference} = options;
  let [scale, key] = params;
  if(scale) {
    var resultScale = function(data) {
      if(isArray(data)) {
        return data.map(item => {
          return calculateValue(get(item, key), scale, scaleDifference);
        });
      } else {
        return calculateValue(get(data, key), scale, scaleDifference);
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
