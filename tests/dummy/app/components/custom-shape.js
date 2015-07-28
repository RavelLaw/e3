import Ember from 'ember';
import e3AnimatedChild from 'e3/mixins/e3-animated-child';

export default Ember.Component.extend(e3AnimatedChild, {
  shadowType(parentContext, selfContext, attrs, matrix, cumMatrix) {
    parentContext.beginPath();
    parentContext.arc(attrs.x, attrs.y, attrs.radius, 0, 2 * Math.PI);
    parentContext.fillStyle = 'blue';
    parentContext.fill();
    return parentContext;
  },

  enterState: {
    x: 0,
    y: 0,
    radius: 500
  },

  activeState: {
    x: 100,
    y: 100,
    radius: 50,
    fill: 'red'
  }
});
