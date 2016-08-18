var sentiment = require('../src/ml/sentiment');
var expect = require('chai').expect;

describe('sentiment analysis', function () {
  describe('sentiment', function () {
    it('should examine the sentiment of text', function () {
      return sentiment.getSentiment('JavaScipt is awesome')
        .then(function (res) {
          expect(res).to.be.an('object');
        });
    });
  });

  describe('concepts', function () {
    it('should identify concepts in text', function () {
      return sentiment.getConcepts('JavaScript is awesome')
        .then(function (res) {
          expect(res).to.be.an('object');
        });
    });
  });

  describe('keywords', function () {
    it('should identify keywords in text', function () {
      return sentiment.getKeywords('JavaScript is awesome')
        .then(function (res) {
          expect(res).to.be.an('object');
        });
    });
  });
});
