import shadowScalesOrdinal from 'ember-e3/utils/shadow/scales/ordinal';
import { module, test } from 'qunit';

module('Unit | Utility | shadow/scales/ordinal');

test('it works', function(assert) {
  let result = shadowScalesOrdinal();
  assert.ok(result);
});

test('basic scaling works', function(assert) {
  let result = shadowScalesOrdinal([0,100], ['a','b','c','d']);
  assert.equal(result('a'), 0);
  assert.equal(result('b'), 100/3);
  assert.equal(result('c'), 200/3);
  assert.equal(result('d'), 100);

  let resultZero = shadowScalesOrdinal([0,100], ['a']);
  assert.equal(resultZero('a'), 0);

  resultZero = shadowScalesOrdinal([0,100], ['a'], {
    banding: true
  });
  assert.equal(resultZero('a'), 0);
});

test('basic scaling works with unique objects as domain', function(assert) {
  let domain = [{},{},{},{}];
  let result = shadowScalesOrdinal([0,100], domain);
  assert.equal(result(domain[0]), 0);
  assert.equal(result(domain[1]), 100/3);
  assert.equal(result(domain[2]), 200/3);
  assert.equal(result(domain[3]), 100);
});

test('outer padding works', function(assert) {
  let result = shadowScalesOrdinal([-10,110], ['a','b','c','d'], {
    outerPadding: 10
  });
  assert.equal(result('a'), 0);
  assert.equal(result('b'), 100/3);
  assert.equal(result('c'), 200/3);
  assert.equal(result('d'), 100);
});

test('banded scaling works', function(assert) {
  let result = shadowScalesOrdinal([0,100], ['a','b','c','d'], {
    banding: true
  });

  assert.equal(result('a'), 0);
  assert.equal(result('b'), 25);
  assert.equal(result('c'), 50);
  assert.equal(result('d'), 75);
  assert.equal(result.bandWidth, 25);
});

test('banded scaling with outer padding works', function(assert) {
  let result = shadowScalesOrdinal([-10,110], ['a','b','c','d'], {
    banding: true,
    outerPadding: 10
  });

  assert.equal(result('a'), 0);
  assert.equal(result('b'), 25);
  assert.equal(result('c'), 50);
  assert.equal(result('d'), 75);
  assert.equal(result.bandWidth, 25);
});

test('banded scaling works with padding', function(assert) {
  let result = shadowScalesOrdinal([0,100], ['a','b','c'], {
    banding: true,
    padding: 0.2
  });

  assert.equal(result('a'), 0);
  assert.equal(result('b'), 80/3 + 10);
  assert.equal(result('c'), 160/3 + 20);
  assert.equal(result.bandWidth, 80/3);
});

test('banded scaling works with padding and outer padding', function(assert) {
  let result = shadowScalesOrdinal([-10,110], ['a','b','c'], {
    banding: true,
    outerPadding: 10,
    padding: 0.2
  });

  assert.equal(result('a'), 0);
  assert.equal(result('b'), 80/3 + 10);
  assert.equal(result('c'), 160/3 + 20);
  assert.equal(result.bandWidth, 80/3);
});

test('looking up a value outside the domain returns the base range', function(assert) {
  let result = shadowScalesOrdinal([10,100], ['b','c','d','e']);
  assert.equal(result('a'), 10);
  assert.equal(result('f'), 10);
});

test('sorted domains are supported', function(assert) {
  let result = shadowScalesOrdinal([0,100], [2,3,4,5]);
  let sortedResult = shadowScalesOrdinal([0,100], [5,3,4,2], {
    sort(a, b) {
      return a - b;
    }
  });

  assert.equal(result(2), sortedResult(2));
  assert.equal(result(3), sortedResult(3));
  assert.equal(result(4), sortedResult(4));
  assert.equal(result(5), sortedResult(5));
});

test('looking up a value outside range with sorted lookup', function(assert) {
  let result = shadowScalesOrdinal([0,100], [2,3,4,6], {
    sort(a, b) {
      return a - b;
    }
  });
  assert.equal(result(1), result(2));
  assert.equal(result(5), result(6));
  assert.equal(result(7), result(6));
  assert.equal(result(3.5), result(4));
});