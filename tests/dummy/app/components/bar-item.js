import Ember from 'ember';
import e3AnimatedChild from 'e3/mixins/e3-animated-child';
import scaleEnd from 'e3/utils/e3-helpers/scale/end';

export default Ember.Component.extend(e3AnimatedChild, {
  shadowType: 'rectangle',

  enterState: {
    height: 0,
    y: scaleEnd('y')
  },

  activeState: {
    fill: 'blue',
    x: null,
    y: null,
    height: null,
    width: null
  },

  /*animation: {
    duration: 1000
  }*/
});
