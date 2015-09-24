import { e3BindLayout } from '../../../helpers/e3-bind-layout';
import { module, test } from 'qunit';

module('Unit | Helper | e3 bind layout');

// Replace this with your real tests.
test('it works', function(assert) {
  let lookup = {'1234': {x: 12}};
  let layout = function(data) {
    return lookup[data.id];
  };

  var result = e3BindLayout([layout, 'x']);
  assert.ok(result);
  assert.equal(result({id: '1234'}), 12, 'the correct value is returned');
});
