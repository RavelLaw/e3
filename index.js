/* jshint node: true */
'use strict';

module.exports = {
  name: 'e3',
  included: function(app) {
    this._super.included(app);

    app.import({
      development: app.bowerDirectory + '/two/build/two.js',
      production: app.bowerDirectory + '/two/build/two.min.js'
    });
  }
};
