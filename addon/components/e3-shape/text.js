import e3AnimatedChild from '../e3-animated-child';

export default e3AnimatedChild.extend({
  shadowType: 'text',

  enterState: {
    x: 0,
    y: 0,
    text: ''
  },

  activeState: {
    x: null,
    y: null,
    text: null
  }
});
