import e3HelpersScaleStart from 'ember-e3/utils/e3-helpers/scale/start';
import { module, test } from 'qunit';

module('Unit | Utility | e3 helpers/scale/start');

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

  let helper = e3HelpersScaleStart('y');
  assert.ok(helper);
  assert.equal(helper.call(context), 0);
});

test('it works without a scale returned', function(assert) {
  assert.expect(3);
  let context = {
    getAttr(attr) {
      assert.equal(attr, 'y');
    }
  };

  let helper = e3HelpersScaleStart('y');
  assert.ok(helper);
  assert.ok(!helper.call(context));
});

