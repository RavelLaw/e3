import shadowTypesCanvas from 'ember-e3/utils/shadow/types/canvas';
import { module, test } from 'qunit';

module('Unit | Utility | shadow/types/canvas');

// Replace this with your real tests.
test('implements all the necessary methods', function(assert) {
  // var result = shadowTypesCanvas();
  assert.ok(shadowTypesCanvas.group && typeof shadowTypesCanvas.group === 'function', 'has group function');
  assert.ok(shadowTypesCanvas.circle && typeof shadowTypesCanvas.circle === 'function', 'has circle function');
  assert.ok(shadowTypesCanvas.rectangle && typeof shadowTypesCanvas.rectangle === 'function', 'has rectangle function');
  assert.ok(shadowTypesCanvas.line && typeof shadowTypesCanvas.line === 'function', 'has line function');
  assert.ok(shadowTypesCanvas.path && typeof shadowTypesCanvas.path === 'function', 'has path function');
  assert.ok(shadowTypesCanvas.text && typeof shadowTypesCanvas.text === 'function', 'has text function');
  assert.ok(shadowTypesCanvas.stage && typeof shadowTypesCanvas.stage === 'function', 'has stage function');
  assert.ok(shadowTypesCanvas.checkEvent && typeof shadowTypesCanvas.checkEvent === 'function', 'has checkEvent function');
  assert.ok(!shadowTypesCanvas.destroy, 'does not have a destroy function as it is implicitly destroyed by not being rendered anymore');
});

/*
 TODO: Create an object that implements the same interface as a convas context to test that the correct
 hooks are utilized for each of the shape types. Make tests against this.
 */