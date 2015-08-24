import Ember from 'ember';
import e3AnimatedChild from 'ember-e3/mixins/e3-animated-child';
import scaleEnd from 'ember-e3/utils/e3-helpers/scale/end';
let colors = ['#AA2222', '#22AA22', '#2222AA'];
let idx = -1;

export default Ember.Component.extend(e3AnimatedChild, {
  shadowType: 'rectangle',

  enterState: {
    height: 0,
    y: scaleEnd('y')
  },

  activeState: {
    fill() {
      return colors[++idx % 3];
    },
    x: null,
    y: null,
    height: null,
    width: null
  },

  animation: {
    duration: 300
  },

  mouseMove() {
    this.sendAction('mouse-move', this.getAttr('data'));
  }
});
