import Ember from 'ember';
import E3AnimatedStatesMixin from '../../../mixins/e3-animated-states';
import { module, test } from 'qunit';

module('Unit | Mixin | e3 animated states');

// Replace this with your real tests.
test('it works', function(assert) {
  var E3AnimatedStatesObject = Ember.Object.extend(E3AnimatedStatesMixin);
  var subject = E3AnimatedStatesObject.create();
  assert.ok(subject);
});
