import Ember from 'ember';
import E3AnimatedChildMixin from 'ember-e3/mixins/e3-animated-child';
import { module, test } from 'qunit';

module('Unit | Mixin | e3 animated child');

// Replace this with your real tests.
test('it works', function(assert) {
  var E3AnimatedChildObject = Ember.Object.extend(E3AnimatedChildMixin);
  var subject = E3AnimatedChildObject.create();
  assert.ok(subject);
});
