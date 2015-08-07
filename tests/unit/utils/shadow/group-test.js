import Group from '../../../../utils/shadow/group';
import Renderable from '../../../../utils/shadow/renderable';
import { module, test } from 'qunit';

module('Unit | Utility | shadow/group');

// Replace this with your real tests.
test('it works', function(assert) {
  var group = new Group({}, 'stage', 'svg');
  var group2 = new Group({}, 'stage', 'svg');
  assert.ok(group);
  assert.notEqual(group.children, group2.children);
});

test('add remove children', function(assert) {
  var group = new Group({}, 'stage', 'svg');
  var child1 = {};
  var child2 = {};

  group._add(child1);
  assert.equal(group.children.length, 1);
  group._add(child2);
  assert.equal(group.children.length, 2);
  group._remove(child1);
  assert.equal(group.children.length, 1);
  group._remove(child1);
  assert.equal(group.children.length, 1);
  group._remove(child2);
  assert.equal(group.children.length, 0);
});

test('renderable join and leave groups', function(assert) {
  var group = new Group({}, 'stage', 'svg');
  var child1 = new Renderable({}, 'circle', 'svg');
  var child2 = new Renderable({}, 'circle', 'svg');

  child1.join(group);
  assert.equal(group.children.length, 1);
  child2.join(group);
  assert.equal(group.children.length, 2);
  child1.leave();
  assert.equal(group.children.length, 1);
  child2.leave();
  assert.equal(group.children.length, 0);
});
