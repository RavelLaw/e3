import shadowTypesSvg from 'e3/utils/shadow/types/svg';
import { module, test } from 'qunit';

module('Unit | Utility | shadow/types/svg');

// Replace this with your real tests.
test('implements all the necessary methods', function(assert) {
  // var result = shadowTypesSvg();
  assert.ok(shadowTypesSvg.group && typeof shadowTypesSvg.group === 'function', 'has group function');
  assert.ok(shadowTypesSvg.circle && typeof shadowTypesSvg.circle === 'function', 'has circle function');
  assert.ok(shadowTypesSvg.rectangle && typeof shadowTypesSvg.rectangle === 'function', 'has rectangle function');
  assert.ok(shadowTypesSvg.line && typeof shadowTypesSvg.line === 'function', 'has line function');
  assert.ok(shadowTypesSvg.path && typeof shadowTypesSvg.path === 'function', 'has path function');
  assert.ok(shadowTypesSvg.text && typeof shadowTypesSvg.text === 'function', 'has text function');
  assert.ok(shadowTypesSvg.stage && typeof shadowTypesSvg.stage === 'function', 'has stage function');
  assert.ok(shadowTypesSvg.checkEvent && typeof shadowTypesSvg.checkEvent === 'function', 'has checkEvent function');
  assert.ok(shadowTypesSvg.destroy && typeof shadowTypesSvg.destroy === 'function', 'has destroy function');
});

/*
 TODO: Create an object that implements the same interface as an svg/group element to test that the correct
 hooks are utilized for each of the shape types. Make tests against this.
 */