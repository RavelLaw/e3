import Ember from 'ember';
const {isArray} = Ember;
const {keys} = Object;

export function e3BindScale(params) {
  let [scale, key] = params;
  if(scale) {
    var resultScale = function(data) {
      if(isArray(data)) {
        return data.map(item => {
          return scale(item, key);
        });
      } else {
        return scale(data, key);
      }
    };

    // Add the additional properties on this scale.
    keys(scale).forEach(key => {
      resultScale[key] = scale[key];
    });

    return resultScale;
  }
}

export default Ember.Helper.helper(e3BindScale);
