import Ember from 'ember';
import E3MetaMixin from '../../../mixins/e3-meta';
import { module, test } from 'qunit';

module('Unit | Mixin | e3 meta');

// Replace this with your real tests.
test('it works', function(assert) {
  var E3MetaObject = Ember.Object.extend(E3MetaMixin);
  var subject = E3MetaObject.create();
  assert.ok(subject);
});
