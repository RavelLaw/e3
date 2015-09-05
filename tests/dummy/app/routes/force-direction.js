import Ember from 'ember';
let ID = 0;
// TODO: Use faker or something here.
function g(number) {
  let res = [];
  while(--number >= 0) {
    res.push(o());
  }
  return res;
}

function o() {
  return {
    id: ++ID,
    value: Math.random() * 100,
    temperature: Math.random() * 100
  };
}

export default Ember.Route.extend({
  actions: {
    add() {
      let model = this.controller.get('model');
      model.push(o());
      this.controller.set('model', model.slice(0));
    },
    clear() {
      this.controller.set('model', []);
    }
  },
  model() {
    return g(10);
  },
  setupController(controller, model) {
    controller.set('model', model);
  }
});
