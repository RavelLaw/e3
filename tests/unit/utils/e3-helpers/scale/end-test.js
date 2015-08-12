import e3HelpersScaleEnd from 'e3/utils/e3-helpers/scale/end';
import { module, test } from 'qunit';

module('Unit | Utility | e3 helpers/scale/end');

// Replace this with your real tests.
test('it works with a scale returned', function(assert) {
  assert.expect(3);
  let context = {
    getAttr(attr) {
      assert.equal(attr, 'y');
      return {
        range: [0,100]
      };
    }
  };

  let helper = e3HelpersScaleEnd('y');
  assert.ok(helper);
  assert.equal(helper.call(context), 100);
});

test('it works without a scale returned', function(assert) {
  assert.expect(3);
  let context = {
    getAttr(attr) {
      assert.equal(attr, 'y');
    }
  };

  let helper = e3HelpersScaleEnd('y');
  assert.ok(helper);
  assert.ok(!helper.call(context));
});

