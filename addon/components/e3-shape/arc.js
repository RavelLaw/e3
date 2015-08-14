import Ember from 'ember';

export default Ember.Component.extend({
  shadowType: 'path',
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
