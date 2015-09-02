import e3AnimatedChild from '../e3-animated-child';

export default e3AnimatedChild.extend({
  shadowType: 'circle',

  enterState: {},

  exitState: {},

  activeState: {
    x: 100,
    y: 100,
    radius: 20,
    fill: 'red'
  }
});
