import monotone from 'ember-e3/utils/shadow/line-interpolation/monotone';
import { Point, SmoothCurve, BezierCurve } from 'ember-e3/utils/shadow/types/commands';
import { module, test } from 'qunit';

module('Unit | Utility | shadow/line interpolation/monotone');

test('it has a wide repetoire of commands', function(assert) {
  var points = [[0, 0], [1, 1], [2, 1], [3, 0], [4, 0]];

  // a + (a - b) = 2a - b where a is the position and b is the last control point
  var commands = monotone(points);
  assert.deepEqual(commands, [
    new Point(0, 0),
    new BezierCurve(0.08333333333333333, 0.08333333333333333, 0.6666666666666667, 1, 1, 1),
    new SmoothCurve(1.3333333333333333, 1, 1.6666666666666667, 1, 2, 1),
    new SmoothCurve(2.3333333333333333, 1, 2.6666666666666665, 0, 3, 0),
    new SmoothCurve(3.3333333333333335, 0, 3.8333333333333335, 0, 4, 0)
  ]);
});

test('it returns single points', function(assert) {
  var points = [[0, 0]];
  assert.deepEqual(monotone(points), [
    [0, 0],
  ]);
});

test('it returns for two points', function(assert) {
  var points = [[0, 0], [1, 1]];
  assert.deepEqual(monotone(points), [
    [0, 0],
    [1, 1]
  ]);
});
