import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import contextShim from '../../helpers/context-shim';

moduleForComponent('e3-stacked-group', 'Integration | Component | e3 stacked each', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('context', contextShim());
  this.set('data', []);
  this.render(hbs`{{e3-stacked-group context sum-props='' data=data}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#e3-stacked-group context sum-props='' data=data}}{{/e3-stacked-group}}
  `);

  assert.equal(this.$().text().trim(), '');
});
