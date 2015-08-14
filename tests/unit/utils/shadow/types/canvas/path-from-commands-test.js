import pathFromCommands from 'ember-e3/utils/shadow/types/canvas/path-from-commands';
import { module, test } from 'qunit';

module('Unit | Utility | shadow/types/canvas/path from commands');

// Replace this with your real tests.
test('it works', function(assert) {
  assert.expect(2);
  pathFromCommands({
    moveTo(x, y) {
      assert.equal(x, 1);
      assert.equal(y, 2);
    }
  }, [[1, 2]]);
});
