import Ember from 'ember';
import e3AnimatedChild from '../../mixins/e3-animated-child';
import middleOfScale from '../../utils/e3-helpers/scale/middle';

export default Ember.Component.extend(e3AnimatedChild, {
  shadowType: 'circle',

  enterState: {
    x: middleOfScale('x'),
    y: middleOfScale('y'),
    radius: 500
  },

  exitState: {
    x: 0,
    y: 0,
    radius: 500
  },

  activeState: {
    x: 100,
    y: 100,
    radius: 20,
    fill: 'red'
  }
});
