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

test('array of values interpolation with different lengths', function(assert) {
  let a = {x: [0]};
  let b = {x: [20, 10, 0]};
  var result = e3Interpolate(a, b, 0.5);
  assert.deepEqual(result, {x: [10,10,0]});

  result = e3Interpolate(b, a, 0.5);
  assert.deepEqual(result, {x: [10,10,0]}, 'opposite works too.');

  result = e3Interpolate(b, a, 1);
  assert.deepEqual(result, a, 'the resulting array at the end is the result');
});

test('interpolate hexadecimal colors', function(assert) {
  assert.equal(e3Interpolate('#000','#fff',0.5), '#808080');
  assert.equal(e3Interpolate('#000000','#ffffff',0.5), '#808080');
});

test('do not interpolate hex like strings', function(assert) {
  assert.equal(e3Interpolate('92.44F', '92.44F', 0.5), '92.44F');
});
