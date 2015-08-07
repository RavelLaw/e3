import Ember from 'ember';
import E3ScaleMixin from 'e3/mixins/e3-scale';
import { module, test } from 'qunit';

module('Unit | Mixin | e3 scale');

// Replace this with your real tests.
test('it works', function(assert) {
  var E3ScaleObject = Ember.Object.extend(E3ScaleMixin);
  var subject = E3ScaleObject.create();
  assert.ok(subject);
});
