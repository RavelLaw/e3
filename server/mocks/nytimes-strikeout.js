module.exports = function(app) {
  var express = require('express');
  var nytimesStrikeoutRouter = express.Router();

  nytimesStrikeoutRouter.get('/outs', function(req, res) {
    res.send(require('../../mock-data/nytimes-strikeouts/outs'));
  });

  nytimesStrikeoutRouter.get('/average-by-count', function(req, res) {
    res.send(require('../../mock-data/nytimes-strikeouts/average-by-count'));
  });

  nytimesStrikeoutRouter.get('/teams', function(req, res) {
    res.send(require('../../mock-data/nytimes-strikeouts/teams'));
  });

  app.use('/api/nytimes-strikeout', nytimesStrikeoutRouter);
};
