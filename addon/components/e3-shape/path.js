import e3AnimatedChild from '../e3-animated-child';

export default e3AnimatedChild.extend({
  shadowType: 'path',
  enterState: {
    x: [],
    y: []
  },
  activeState: {
    x: null,
    y: null,
    'stroke-width': 5,
    'stroke': 'blue',
    'fill': 'none',
    'interpolation': 'linear'
  }
});
