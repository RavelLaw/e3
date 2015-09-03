import e3AnimatedChild from '../e3-animated-child';

export default e3AnimatedChild.extend({
  shadowType: 'arc',
  enterState: {},
  activeState: {
    x: 0,
    y: 0,
    'start-angle': 0,
    'angle': 0,
    'inner-radius': 0,
    'outer-radius': null
  }
});
