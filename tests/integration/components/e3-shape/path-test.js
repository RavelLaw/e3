import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import contextShim from '../../../helpers/context-shim';

moduleForComponent('e3-shape/path', 'Integration | Component | e3 shape/path', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('context', contextShim());
  this.render(hbs`{{e3-shape/path context}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#e3-shape/path context}}
      template block text
    {{/e3-shape/path}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
