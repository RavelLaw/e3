import Ember from 'ember';
import E3RenderableMixin from '../../../mixins/e3-renderable';
import { module, test } from 'qunit';

module('Unit | Mixin | e3 renderable');

// Replace this with your real tests.
test('it works', function(assert) {
  var E3RenderableObject = Ember.Object.extend(E3RenderableMixin);
  var subject = E3RenderableObject.create();
  assert.ok(subject);
});
