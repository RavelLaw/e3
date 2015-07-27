import Ember from 'ember';
import E3ChildMixin from '../../../mixins/e3-child';
import { module, test } from 'qunit';

module('Unit | Mixin | e3 child');

// Replace this with your real tests.
test('it works', function(assert) {
  var E3ChildObject = Ember.Object.extend(E3ChildMixin);
  var subject = E3ChildObject.create();
  assert.ok(subject);
});
