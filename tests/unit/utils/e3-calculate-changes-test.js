import e3CalculateChanges from 'ember-e3/utils/e3-calculate-changes';
import { module, test } from 'qunit';

module('Unit | Utility | e3 calculate changes');

// Replace this with your real tests.
test('compare empty arrays', function(assert) {
  let result = e3CalculateChanges([], []);
  assert.deepEqual(result, {
    active: [],
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
    active: [obj],
    enter: [obj],
    exit: [],
    update: []
  });

  result = e3CalculateChanges([obj], [obj]);
  assert.deepEqual(result, {
    active: [obj],
    enter: [],
    exit: [],
    update: [obj]
  });

  result = e3CalculateChanges([obj], []);
  assert.deepEqual(result, {
    active: [],
    enter: [],
    exit: [obj],
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
    active: [objA, objB, objC],
    enter: [objA, objB, objC],
    exit: [],
    update: []
  });

  result = e3CalculateChanges([objA, objB, objC], []);
  assert.deepEqual(result, {
    active: [],
    enter: [],
    exit: [objA, objB, objC],
    update: []
  });

  result = e3CalculateChanges([objA, objB, objC], [objA, objB, objC]);
  assert.deepEqual(result, {
    active: [objA, objB, objC],
    enter: [],
    exit: [],
    update: [objA, objB, objC]
  });

  result = e3CalculateChanges([objA, objB], [objB, objC]);
  assert.deepEqual(result, {
    active: [objB, objC],
    enter: [objC],
    exit: [objA],
    update: [objB]
  });
});
