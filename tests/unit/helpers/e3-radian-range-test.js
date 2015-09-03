import { e3RadianRange } from 'ember-e3/helpers/e3-radian-range';
import { module, test } from 'qunit';

module('Unit | Helper | e3 radian range');

// Replace this with your real tests.
test('it works', function(assert) {
  let result;
  result = e3RadianRange([], {});
  assert.deepEqual(result, [0, 2 * Math.PI]);

  result = e3RadianRange([], {start: 0.5});
  assert.deepEqual(result, [Math.PI, 2 * Math.PI]);

  result = e3RadianRange([], {end: 0.5});
  assert.deepEqual(result, [0, Math.PI]);

  result = e3RadianRange([], {end: 0.75, start: 0.25});
  assert.deepEqual(result, [Math.PI / 2, Math.PI * 1.5]);
});
