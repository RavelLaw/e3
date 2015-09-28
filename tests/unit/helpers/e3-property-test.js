import { e3Property } from '../../../helpers/e3-property';
import { module, test } from 'qunit';

module('Unit | Helper | e3 property');

// Replace this with your real tests.
test('it works', function(assert) {
  var result = e3Property(['moo']);
  assert.equal(result({moo: 12}), 12, 'it gets the value');
});
