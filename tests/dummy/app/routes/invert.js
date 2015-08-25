import Ember from 'ember';
export default Ember.Route.extend({
  model() {
    return [
        {
          year: 2010,
          rainfall: 41,
          temperature: 96
        },
        {
          year: 2011,
          rainfall: 35,
          temperature: 95
        },
        {
          year: 2012,
          rainfall: 33,
          temperature: 96
        },
        {
          year: 2013,
          rainfall: 32,
          temperature: 91
        },
        {
          year: 2014,
          rainfall: 27,
          temperature: 89
        },
        {
          year: 2015,
          rainfall: 26,
          temperature: 85
        },
        {
          year: 2016,
          rainfall: 20,
          temperature: 81
        },
        {
          year: 2017,
          rainfall: 16,
          temperature: 74
        }
    ];
  }
});
