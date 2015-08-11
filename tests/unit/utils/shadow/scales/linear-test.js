import shadowScalesLinear from 'e3/utils/shadow/scales/linear';
import { module, test } from 'qunit';

module('Unit | Utility | shadow/scales/linear');

// Replace this with your real tests.
test('it works', function(assert) {
  // The default is to return an identity scale.
  let result = shadowScalesLinear();
  assert.ok(result);
  assert.equal(result(0.5), 0.5);
  assert.equal(result(0), 0);
  assert.equal(result(1), 1);
  assert.equal(result(-1), -1);
});

test('do basic linear inerpolation tests', function(assert) {
  let result = shadowScalesLinear([0,100], [0,10]);
  assert.equal(result(5), 50);
  assert.equal(result(-5), -50);
  assert.equal(result(10), 100);
  assert.equal(result(15), 150);
});

test('do basic linear inerpolation tests without 0 base', function(assert) {
  let result = shadowScalesLinear([90,100], [0,10]);
  assert.equal(result(5), 95);
  assert.equal(result(-5), 85);
  assert.equal(result(10), 100);
  assert.equal(result(15), 105);
});

test('do basic linear inerpolation tests with clamping', function(assert) {
  let result = shadowScalesLinear([0,100], [0,10], {
    clamp: true
  });

  assert.equal(result(5), 50);
  assert.equal(result(-5), 0);
  assert.equal(result(10), 100);
  assert.equal(result(15), 100);
});

test('do basic linear inerpolation tests with clamping non-zero base', function(assert) {
  let result = shadowScalesLinear([90,100], [0,10], {
    clamp: true
  });

  assert.equal(result(5), 95);
  assert.equal(result(-5), 90);
  assert.equal(result(10), 100);
  assert.equal(result(15), 100);
});

test('make the round option return only integers', function(assert) {
  let result = shadowScalesLinear([5,10], [0,10]);

  let resultRound = shadowScalesLinear([5,10], [0,10], {
    round: true
  });

  assert.equal(result(5), 7.5);
  assert.equal(resultRound(5), 8);
});