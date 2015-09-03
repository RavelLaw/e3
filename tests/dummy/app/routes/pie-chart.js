import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    addBar() {
      let model = this.controller.get('model').slice(0);
      model.unshift(o());
      this.controller.set('model', model);
    },
    removeBar() {
      let model = this.controller.get('model').slice(0);
      model.pop();
      this.controller.set('model', model);
    }
  },

  model() {
    return g(10);
  }
});

function g(number) {
  let res = [];
  while(--number >= 0) {
    res.push(o());
  }
  return res;
}

let ID = 0;
function o() {
  return {
    id: ++ID,
    value: Math.random() * 100,
    temperature: Math.random() * 100
  };
}