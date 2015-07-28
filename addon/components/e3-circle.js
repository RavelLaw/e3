import Ember from 'ember';
import e3AnimatedChild from '../mixins/e3-animated-child';

export default Ember.Component.extend(e3AnimatedChild, {
  shadowType: 'circle',

  enterState: {
    x: 0,
    y: 0
  },

  exitState: {
    x: 0,
    y: 0
  },

  activeState: {
    x: 100,
    y: 100,
    radius: 50,
    fill: 'red'
  },

  drag(e) {
    console.log('drag', e.dx, e.dy);
  }
});
