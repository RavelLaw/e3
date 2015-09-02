import e3AnimatedChild from 'ember-e3/components/e3-animated-child';

export default e3AnimatedChild.extend({
  shadowType(parentContext, selfContext, attrs) {
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
