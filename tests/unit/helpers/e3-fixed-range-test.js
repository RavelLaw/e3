import { e3FixedRange } from '../../../helpers/e3-fixed-range';
import { module, test } from 'qunit';

module('Unit | Helper | e3 fixed range');

test('returns the range fom min to max', function(assert) {
  var result = e3FixedRange([], {min: 1, max: 2});
  assert.deepEqual(result, [1, 2]);
});

test('it does not explode without params', function(assert) {
  assert.ok(e3FixedRange([], {}));
});
