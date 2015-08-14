import Ember from 'ember';
import E3RenderQueueMixin from 'ember-e3/mixins/e3-render-queue';
import { module, test } from 'qunit';

module('Unit | Mixin | e3 render queue');

// Replace this with your real tests.
test('attempt single animation', function(assert) {
  let done = assert.async();
  let iterations = 4;
  let currentIteration = 0;
  assert.expect(iterations*3 + 3);

  var E3RenderQueueObject = Ember.Object.extend(E3RenderQueueMixin, {
    willStart: Ember.on('animationWillStart', function() {
      assert.ok(true, 'animation will start hook executed');
    }),

    didEnd: Ember.on('animationDidComplete', function() {
      assert.ok(true, 'animation did complete hook executed');
      done();
    }),

    willDoTick: Ember.on('tickWillRender', function() {
      assert.ok(true, 'tick will render hook ok');
    }),

    didDoTick: Ember.on('tickDidRender', function() {
      assert.ok(true, 'tick did render hook ok');
    })
  });

  var subject = E3RenderQueueObject.create();
  assert.ok(subject, 'object creates');

  subject.addToQueue((time) => {
    currentIteration++;
    assert.ok(time, 'iteration ocurred');
    return currentIteration >= iterations;
  });
});
