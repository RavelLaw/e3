import Ember from 'ember';
let ID = 0;
function g(number) {
  let res = [];
  while(--number >= 0) {
    res.push(s());
  }
  return res;
}

function s() {
  let count = 3;
  let children = [];
  while(--count >= 0) {
    children.push(o());
  }

  return {
    children: children
  };
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
      model.push(s());
      model.push(s());
      model.push(s());
      model.push(s());
      this.controller.set('model', model.slice(0));
    },
    remove() {
      let model = this.controller.get('model');
      this.controller.set('model', model.slice(5));
    },
    mouseMoved(item) {
      this.controller.set('hoveredData', item);
    }
  },
  model() {
    return g(20);
  }
});
