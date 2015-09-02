import Ember from 'ember';

export default Ember.Controller.extend({
  activeTeamOuts: null,
  actions: {
    pickTeam(evt) {
      let code = evt.target.value;
      if(!code) {
        this.set('activeTeamOuts', null);
      }

      let teamStats = this.get('model.outs').filter(out => {
        return out.franchise === code;
      });
      this.set('activeTeamOuts', teamStats);
    }
  }
});
