import Ember from 'ember';
import scale from '../mixins/e3-scale';

let e3Scale = Ember.Component.extend(scale, {
  generateScale() {
    return function(d) {
      return d;
    };
  }
});
e3Scale.reopenClass({
  positionalParams: ['_e3Context', 'name']
});
export default e3Scale;
