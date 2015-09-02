import { e3ScaleMin } from 'ember-e3/helpers/e3-scale-min';
import { module, test } from 'qunit';

module('Unit | Helper | e3 scale min');

// Replace this with your real tests.
test('it works', function(assert) {
  let result;
  result = e3ScaleMin([{
    range: [0,100]
  }], {});
  assert.equal(result, 0);

  result = e3ScaleMin([{
    range: [0,100]
  }], {
    minus: 5
  });
  assert.equal(result, -5);

  result = e3ScaleMin([{
    range: [0,100]
  }], {
    add: 5
  });
  assert.equal(result, 5);
});
