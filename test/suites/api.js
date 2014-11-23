/**
 * MTGNode API Unit Tests
 * =======================
 *
 * Testing the API to see whether correct data is returned.
 */
var assert = require('assert'),
    app = require('../../api/app.js'),
    request = require('supertest'),
    agent = request.agent(app);

describe('API', function() {

  describe('Cards', function() {

    it('should return 400 when request is not correct.', function(done) {
      agent
        .post('/cards')
        .send({cards: 'hello'})
        .expect(400, done);
    });

    it('should return 404 when requesting an inexistant card.', function(done) {
      agent
        .get('/card/tada')
        .expect(404, done);
    });

    it('should be possible to get one card by id.', function(done) {
      agent
        .get('/card/389751')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);

          assert.strictEqual(res.body.name, 'Wolfcaller\'s Howl');
          done();
        })
    });

    it('should be possible to get several cards.', function(done) {
      agent
        .post('/cards')
        .send({cards: [389751, 389752]})
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);

          assert.strictEqual(res.body[1].name, 'Wood Elves');
          done();
        })
    });
  });
});
