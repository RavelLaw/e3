import { e3ScaleMax } from 'ember-e3/helpers/e3-scale-max';
import { module, test } from 'qunit';

module('Unit | Helper | e3 scale max');

// Replace this with your real tests.
test('it works', function(assert) {
  let result;
  result = e3ScaleMax([{
    range: [0,100]
  }], {});
  assert.equal(result, 100);

  result = e3ScaleMax([{
    range: [0,100]
  }], {
    minus: 5
  });
  assert.equal(result, 95);

  result = e3ScaleMax([{
    range: [0,100]
  }], {
    add: 5
  });
  assert.equal(result, 105);
});
