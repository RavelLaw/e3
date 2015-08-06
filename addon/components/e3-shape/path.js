import Ember from 'ember';
import e3AnimatedChild from '../../mixins/e3-animated-child';

export default Ember.Component.extend(e3AnimatedChild, {
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
    'fill': 'none'
  }
});
