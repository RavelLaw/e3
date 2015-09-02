import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('e3-container', 'Integration | Component | e3 container', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#e3-container type='svg'}}
      template block text
    {{/e3-container}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
