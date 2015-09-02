import e3AnimatedChild from '../e3-animated-child';

export default e3AnimatedChild.extend({
  shadowType: 'line',

  enterState: {},

  exitState: {},

  activeState: {
    x1: 0,
    x2: 0,
    y1: 100,
    y2: 100,
    'stroke': '#000000',
    'stroke-width': 1
  }
});
