import circle from 'ember-e3/components/e3-shape/circle';

export default circle.extend({
  click(event, data) {
    alert('Clicked: '+JSON.stringify(data));
  }
});
