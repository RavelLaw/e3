import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return g(20);
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
