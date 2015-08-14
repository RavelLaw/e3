import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('bubble-1');
  this.route('stacked-bar');
  this.route('line-graph');
  this.route('smooth-line-graph');
  this.route('text-sample');
  this.route('bar-chart');
  this.route('grouped-bars');
});

export default Router;
