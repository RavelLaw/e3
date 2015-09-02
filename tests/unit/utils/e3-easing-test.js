import Ember from 'ember';
import e3Easing from 'ember-e3/utils/e3-easing';
import { module, test } from 'qunit';

module('Unit | Utility | e3 easing');

test('ease-in-cubic', function (assert) {
  const value = 1234;
  const percent = 42;
  const spy = Edgar.createSpy(Math, 'pow', value); // We don't need to test Math functions

  const cubic = e3Easing('ease-in-cubic');
  assert.equal(Ember.typeOf(cubic), 'function', 'a method is returned');

  const result = cubic(percent);
  assert.equal(spy.called(), 1, 'Math.pow was called once');

  const args = spy.calledWith();
  assert.equal(args.length, 2, '2 params passed to Math.pow');
  assert.equal(args[0], percent, 'percent used as base');
  assert.equal(args[1], 3, 'cubic power used as exponent');

  assert.equal(result, value, 'result of Math.pow was returned');
});

test('elastic', function (assert) {
  const powValue = 12;
  const sinValue = 3;
  const percent = 42;
  const powSpy = Edgar.createSpy(Math, 'pow', powValue);
  const sinSpy = Edgar.createSpy(Math, 'sin', sinValue);

  const elastic = e3Easing('elastic');
  assert.equal(Ember.typeOf(elastic), 'function', 'a method is returned');

  const result = elastic(percent);
  assert.equal(powSpy.called(), 1, 'Math.pow was called once');
  assert.equal(sinSpy.called(), 1, 'Math.sin was called once');

  const powArgs = powSpy.calledWith();
  assert.equal(powArgs.length, 2, '2 params passed to Math.pow');
  assert.equal(powArgs[0], 2, '2 used as base');
  assert.equal(powArgs[1], -10*percent, 'percent used to construct exponent');

  const sinArgs = sinSpy.calledWith();
  assert.equal(sinArgs.length, 1, '1 param passed to Math.sin');
  assert.equal(sinArgs[0], (percent-0.3/4)*(2*Math.PI)/0.3, 'percent used to construct sin value');

  assert.equal(result, powValue * sinValue + 1, 'results of pow()/sin() used to construct result');
});

test('linear', function (assert) {
  const percent = 42;
  const linear = e3Easing('linear');

  assert.equal(Ember.typeOf(linear), 'function', 'a method is returned');
  assert.equal(linear(percent), percent, 'percent is returned unchanged');
});

test('non-existent easing methods', function (assert) {
  const foo = e3Easing('foo');
  const linear = e3Easing('linear');

  assert.equal(Ember.typeOf(foo), 'function', 'a method is returned');
  assert.equal(foo, linear, 'linear easing is used if chosen easing method is unrecognized');
});
