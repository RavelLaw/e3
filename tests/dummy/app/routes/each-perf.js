import Ember from 'ember';

function generate(x = 100) {
  let res = [];
  while(--x >= 0) {
    res.push({
      id: x,
      x: Math.floor(Math.random() * 800),
      y: Math.floor(Math.random() * 800)
    });
  }

  return res;
};

export default Ember.Route.extend({
  actions: {
    change() {
      this.controller.set('model', generate(50))
    }
  },
  model() {
    return generate(5000);
  },
  setupController() {
    this._super.apply(this, arguments);
    console.time('TEST');
    Ember.run.scheduleOnce('afterRender', () => {
      console.timeEnd('TEST');
    });
  }
});
