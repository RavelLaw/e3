import e3Ticks from '../../../utils/e3-ticks';
import { module, test } from 'qunit';

module('Unit | Utility | e3 ticks');

// Replace this with your real tests.
test('generate a variety of ticks', function(assert) {
  let result;
  result = e3Ticks([0,100], 5);
  assert.deepEqual(result, [0,20,40,60,80,100]);

  result = e3Ticks([0,100], 2);
  assert.deepEqual(result, [0,50,100]);

  result = e3Ticks([0,100], 10);
  assert.deepEqual(result, [0,10,20,30,40,50,60,70,80,90,100]);

  result = e3Ticks([0,100], 1);
  assert.deepEqual(result, [0,100]);

  result = e3Ticks([0,1], 5);
  assert.deepEqual(result, [0,0.2,0.4,0.6,0.8,1]);

  result = e3Ticks([0,1], 2);
  assert.deepEqual(result, [0,0.5,1]);

  result = e3Ticks([0,1], 10);
  assert.deepEqual(result, [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1]);

  result = e3Ticks([0,1], 1);
  assert.deepEqual(result, [0,1]);

  result = e3Ticks([-0.4, 108.87], 5);
  assert.deepEqual(result, [0,20,40,60,80,100]);
});
