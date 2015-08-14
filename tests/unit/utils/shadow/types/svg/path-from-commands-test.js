import pathFromCommands from 'ember-e3/utils/shadow/types/svg/path-from-commands';
import { module, test } from 'qunit';

module('Unit | Utility | shadow/types/svg/path from commands');

test('Move to', function(assert) {
  var result = pathFromCommands([[1, 1]]);
  assert.equal(result, 'M1,1');
});

test('Line to', function(assert) {
  var result = pathFromCommands([[1, 1], [2, 2]]);
  assert.equal(result, 'M1,1 L2,2');
});

test('Quadratic', function(assert) {
  var result = pathFromCommands([[1, 1, 1, 1, 1, 1]]);
  assert.equal(result, 'C1,1,1,1,1,1');
});

test('Smooth', function(assert) {
  var result = pathFromCommands([[1, 1, 1, 1]]);
  assert.equal(result, 'S1,1,1,1');
});
