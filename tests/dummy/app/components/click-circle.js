import circle from 'ember-e3/components/e3-shape/circle';

export default circle.extend({
  click(event, data) {
    /* global alert */
    alert('Clicked: '+JSON.stringify(data));
  },
  mouseMove(event, data) {
    this.sendAction('on-hover', data);
  }
});
