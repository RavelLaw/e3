import Group from '../../../../utils/shadow/group';
import Renderable from '../../../../utils/shadow/renderable';
import { module, test } from 'qunit';

module('Unit | Utility | shadow/group');

// Replace this with your real tests.
test('it works', function(assert) {
  var group = new Group();
  var group2 = new Group();
  assert.ok(group);
  assert.notEqual(group.children, group2.children);
});

test('add remove children', function(assert) {
  var group = new Group();
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
  var group = new Group();
  var child1 = new Renderable();
  var child2 = new Renderable();

  child1.join(group);
  assert.equal(group.children.length, 1);
  child2.join(group);
  assert.equal(group.children.length, 2);
  child1.leave();
  assert.equal(group.children.length, 1);
  child2.leave();
  assert.equal(group.children.length, 0);
});

test('test group matrix generation', function(assert) {
  let group = new Group();
  group.setAttributes({
    x: 50,
    y: 10
  });

  let childGroup = new Group();
  childGroup.join(group);
  childGroup.setAttributes({
    x: 20,
    y: 30
  });

  let grandChild = new Group();
  grandChild.join(childGroup);
  grandChild.setAttributes({
    x: -70,
    y: -40
  });

  let matrix = group.getMatrix();
  assert.deepEqual(matrix, [1,0,50,0,1,10,0,0,1]);
  let childMatrix = childGroup.getMatrix();
  assert.deepEqual(childMatrix, [1,0,70,0,1,40,0,0,1]);
  let grandMatrix = grandChild.getMatrix();
  assert.deepEqual(grandMatrix, [1,0,0,0,1,0,0,0,1]);
});
