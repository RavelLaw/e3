import mmath from '../../../../utils/shadow/matrix-math';
import { module, test } from 'qunit';
const {
  multiply,
  identity,
  scale,
  translate,
  rotate,
  toArray
} = mmath;

module('Unit | Utility | shadow/matrix math');

// Replace this with your real tests.
test('it works', function(assert) {
  let matrix = identity();
  assert.ok(matrix);
  assert.equal(matrix.join(''), '100010001');
  assert.equal(translate(matrix, 3, 3).join(''), '103013001');
  assert.equal(translate(translate(matrix, 3, 3),3,3).join(''), '106016001');
});
