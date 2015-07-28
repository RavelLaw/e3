import { e3Unique } from '../../../helpers/e3-unique';
import { module, test } from 'qunit';

module('Unit | Helper | e3 unique');

// Replace this with your real tests.
test('basic unique tests', function(assert) {
  var result;
  result = e3Unique([[1,2,3,4]], {});
  assert.deepEqual(result, [1,2,3,4]);

  result = e3Unique([[1,2,3,4,4]], {});
  assert.deepEqual(result, [1,2,3,4]);

  result = e3Unique([[1,2,3,4,4,3,2,1]], {});
  assert.deepEqual(result, [1,2,3,4]);

  result = e3Unique([[{val:1},{val:100},{val:20},{val:-5}]], {key :'val'});
  assert.deepEqual(result, [1,100,20,-5]);
});
