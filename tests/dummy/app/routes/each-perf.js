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
}

export default Ember.Route.extend({
  actions: {
    change() {
      this.controller.set('model', generate(200));
    },
    change2() {
      this.controller.set('model', generate(300));
    },
    togglePaddeder() {
      this.controller.set('yScalePadding', Math.random()*0.5);
    },
    toggleShow() {
      this.controller.toggleProperty('showCircles');
    }
  },
  model() {
    return generate(500);
  },
  setupController(controller) {
    controller.set('yScalePadding', 0);
    controller.set('showCircles', true);
    this._super.apply(this, arguments);
  }
});
