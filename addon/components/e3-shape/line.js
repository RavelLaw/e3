import e3AnimatedChild from '../e3-animated-child';

export default e3AnimatedChild.extend({
  shadowType: 'line',

  enterState: {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0
  },

  exitState: {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0
  },

  activeState: {
    x1: 0,
    x2: 0,
    y1: 100,
    y2: 100,
    'stroke': 'orange',
    'stroke-width': 5
  }
});
