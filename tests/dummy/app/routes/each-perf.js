import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let x = 100;
    let res = [];
    while(--x > 0) {
      res.push({
        val: x
      });
    }

    return res;
  }
});
