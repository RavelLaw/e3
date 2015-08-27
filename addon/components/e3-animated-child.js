import Ember from 'ember';
import e3AnimatedChildMixin from '../mixins/e3-animated-child';

let e3AnimatedChild = Ember.Component.extend(e3AnimatedChildMixin, {
  activeState: {}
});

e3AnimatedChild.reopenClass({
  positionalParams: ['_e3Context']
});

export default e3AnimatedChild;
