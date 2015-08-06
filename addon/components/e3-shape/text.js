import Ember from 'ember';
import e3AnimatedChild from '../../mixins/e3-animated-child';

export default Ember.Component.extend(e3AnimatedChild, {
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
