import pathCommands from 'ember-e3/utils/shadow/line-interpolation/path-commands';
import { module, test } from 'qunit';

module('Unit | Utility | shadow/line interpolation/path commands');

test('it zips points', function(assert) {
  var result = pathCommands([1, 2], [3, 4]);
  assert.deepEqual(result, [[1, 3], [2, 4]]);
});
