import Ember from 'ember';
import E3RenderQueueMixin from '../../../mixins/e3-render-queue';
import { module, test } from 'qunit';

module('Unit | Mixin | e3 render queue');

// Replace this with your real tests.
test('it works', function(assert) {
  var E3RenderQueueObject = Ember.Object.extend(E3RenderQueueMixin);
  var subject = E3RenderQueueObject.create();
  assert.ok(subject);
});
