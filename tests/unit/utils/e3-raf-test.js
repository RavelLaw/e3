import e3Raf from '../../../utils/e3-raf';
import Ember from 'ember';
import { module, test } from 'qunit';

module('Unit | Utility | e3 raf');

// Replace this with your real tests.
test('it works', function(assert) {
  let RAF = e3Raf();
  let done = assert.async();

  Ember.run(() => {
    RAF(time => {
      assert.ok(time, 'request animation frame works.');
      done();
    });
  });
});
