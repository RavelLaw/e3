import e3CalculateChanges from 'ember-e3/utils/e3-calculate-changes';
import { module, test } from 'qunit';

module('Unit | Utility | e3 calculate changes');

// Replace this with your real tests.
test('compare empty arrays', function(assert) {
  let result = e3CalculateChanges([], []);
  assert.deepEqual(result, {
    enter: [],
    exit: [],
    update: []
  });
});

test('changes with one object', function(assert) {
  let obj = {};
  let result;

  result = e3CalculateChanges([], [obj]);
  assert.deepEqual(result, {
    enter: [obj],
    exit: [],
    update: []
  });

  result = e3CalculateChanges([obj], [obj]);
  assert.deepEqual(result, {
    enter: [],
    exit: [],
    update: [obj]
  });

  result = e3CalculateChanges([obj], []);
  assert.deepEqual(result, {
    enter: [],
    exit: [obj],
    update: []
  });
});

test('changes with object key', function(assert) {
  let result;

  result = e3CalculateChanges([], [{x: 1}], 'x');
  assert.deepEqual(result, {
    enter: [{x: 1}],
    exit: [],
    update: []
  });

  result = e3CalculateChanges([{x: 1}], [{x: 1}], 'x');
  assert.deepEqual(result, {
    enter: [],
    exit: [],
    update: [{x: 1}]
  });

  result = e3CalculateChanges([{x: 1}], [], 'x');
  assert.deepEqual(result, {
    enter: [],
    exit: [{x: 1}],
    update: []
  });
});

test('changes with multiple objects', function(assert) {
  let objA = {};
  let objB = {};
  let objC = {};
  let result;

  result = e3CalculateChanges([], [objA, objB, objC]);
  assert.deepEqual(result, {
    enter: [objA, objB, objC],
    exit: [],
    update: []
  });

  result = e3CalculateChanges([objA, objB, objC], []);
  assert.deepEqual(result, {
    enter: [],
    exit: [objA, objB, objC],
    update: []
  });

  result = e3CalculateChanges([objA, objB, objC], [objA, objB, objC]);
  assert.deepEqual(result, {
    enter: [],
    exit: [],
    update: [objA, objB, objC]
  });

  result = e3CalculateChanges([objA, objB], [objB, objC]);
  assert.deepEqual(result, {
    enter: [objC],
    exit: [objA],
    update: [objB]
  });
});
