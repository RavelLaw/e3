import e3Interpolate from '../../../utils/e3-interpolate';
import { module, test } from 'qunit';

module('Unit | Utility | e3 interpolate');

// Replace this with your real tests.
test('basic number interpolation works', function(assert) {
  let a = {x: 0, y: 50, z: 20};
  let b = {x: 100, y: 0, z: 20};

  var result = e3Interpolate(a, b, 0.5);
  assert.deepEqual(result, {x: 50, y: 25, z: 20});
});

test('add array of values interpolation', function(assert) {
  let a = {x: [0,10,20]};
  let b = {x: [20, 10, 0]};
  var result = e3Interpolate(a, b, 0.5);
  assert.deepEqual(result, {x: [10,10,10]});
});
