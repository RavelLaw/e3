import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import contextShim from '../../helpers/context-shim';

moduleForComponent('e3-animated-child', 'Integration | Component | e3 animated child', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('context', contextShim());

  assert.raises(() => {
    this.render(hbs`{{e3-animated-child context}}`);
  }, 'This is not allowed as there is no renderable type.');

  // Template block usage:
  assert.raises(() => {
    this.render(hbs`
      {{#e3-animated-child context}}
        template block text
      {{/e3-animated-child}}
    `);
  }, 'This is not allowed as there is no renderable type');
});
