import e3AnimatedChild from '../e3-animated-child';

export default e3AnimatedChild.extend({
  shadowType: 'text',

  enterState: {},

  activeState: {
    x: null,
    y: null,
    text: null,
    'text-align': 'start'
  }
});
