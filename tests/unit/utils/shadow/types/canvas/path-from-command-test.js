import pathFromCommand from 'e3/utils/shadow/types/canvas/path-from-command';
import { module, test } from 'qunit';

module('Unit | Utility | shadow/types/canvas/path from command');

// Replace this with your real tests.
test('it works', function(assert) {
  assert.expect(2);
  pathFromCommand({
    moveTo(x, y) {
      assert.equal(x, 1);
      assert.equal(y, 2);
    }
  }, [[1, 2]]);
});
