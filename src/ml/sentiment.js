var Alchemy = require('./vendor/alchemyapi');
var api = new Alchemy();

exports.getSentiment = function (text) {
  return new Promise(function (resolve) {
    api.sentiment('text', text, {}, function (res) {
      resolve(res);
    });
  });
};

exports.getConcepts = function (text) {
  return new Promise(function (resolve) {
    api.concepts('text', text, { showSourceText: 1 }, function (res) {
      resolve(res);
    });
  });
};

exports.getKeywords = function (text) {
  return new Promise(function (resolve) {
    api.keywords('text', text, { sentiment: 1 }, function (res) {
      resolve(res);
    });
  });
};
