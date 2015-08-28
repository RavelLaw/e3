import Ember from 'ember';
const {RSVP: {hash}, $: {ajax}} = Ember;

export default Ember.Route.extend({
  model() {
    return hash({
      outs: ajax('/api/nytimes-strikeout/outs'),
      teams: ajax('/api/nytimes-strikeout/teams')
    });
  },
  setupController(controller, model) {
    let avg = {};
    model.outs.forEach(out => {
      if(!avg[out.year]) {
        avg[out.year] = [0,0,out.year];
      }
      let [tot, count, year] = avg[out.year];
      avg[out.year] = [tot + out.kpg, count + 1, year];
    });

    let resultAvg = [];
    Object.keys(avg).forEach(year => {
      let cur = avg[year];
      resultAvg.push({
        year: cur[2],
        avg: cur[0] / cur[1]
      });
    });
    model.avg = resultAvg;

    controller.set('model', model);
  }
});
