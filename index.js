/* jshint node: true */
'use strict';

module.exports = {
  name: 'e3',
  included: function(app) {
    this._super.included(app);

    app.import({
      development: app.bowerDirectory + '/two.js/build/two.js',
      production: app.bowerDirectory + '/two.js/build/two.min.js'
    });
  }
};
