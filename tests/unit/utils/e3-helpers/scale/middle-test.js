import e3HelpersScaleMiddle from 'ember-e3/utils/e3-helpers/scale/middle';
import { module, test } from 'qunit';

module('Unit | Utility | e3 helpers/scale/middle');

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

  let helper = e3HelpersScaleMiddle('y');
  assert.ok(helper);
  assert.equal(helper.call(context), 50);
});

test('it works without a scale returned', function(assert) {
  assert.expect(3);
  let context = {
    getAttr(attr) {
      assert.equal(attr, 'y');
    }
  };

  let helper = e3HelpersScaleMiddle('y');
  assert.ok(helper);
  assert.ok(!helper.call(context));
});

