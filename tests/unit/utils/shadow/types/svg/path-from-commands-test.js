import pathFromCommands from 'e3/utils/shadow/types/svg/path-from-commands';
import { module, test } from 'qunit';

module('Unit | Utility | shadow/types/svg/path from commands');

test('Move to', function(assert) {
  var result = pathFromCommands([[1, 1]]);
  assert.equal(result, 'M 1 1');
});

test('Line to', function(assert) {
  var result = pathFromCommands([[1, 1], [2, 2]]);
  assert.equal(result, 'M 1 1 L 2 2');
});

test('Quadratic', function(assert) {
  var result = pathFromCommands([[1, 1, 1, 1, 1, 1]]);
  assert.equal(result, 'Q 1 1 1 1 1 1');
});

test('Smooth', function(assert) {
  var result = pathFromCommands([[1, 1, 1, 1]]);
  assert.equal(result, 'C 1 1 1 1');
});
