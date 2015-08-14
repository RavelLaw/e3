import Ember from 'ember';
import E3ChildMixin from 'ember-e3/mixins/e3-child';
import { module, test } from 'qunit';

module('Unit | Mixin | e3 child');

// Replace this with your real tests.
test('it works', function(assert) {
  assert.expect(5);
  let context = {
    register(obj) {
      assert.ok(obj, 'object was registered');
    },
    getType() {
      assert.ok(true, 'got type');
      return 'svg';
    },
    unregister(obj) {
      assert.ok(obj, 'object was unregistered');
    }
  };

  let E3ChildObject = Ember.Object.extend(E3ChildMixin);
  let subject = E3ChildObject.create({
    getAttr(key) {
      return this.get('attrs.'+key);
    },
    attrs: {
      context: context
    }
  });

  assert.ok(subject);
  subject.registerToContext();
  let type = subject.getType();
  assert.equal(type, 'svg');
  subject.unregister();
});
