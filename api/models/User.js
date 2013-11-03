/**
 * User
 *
 * @module      :: Model
 * @description :: Application users
 *
 */
var crypto = require('crypto');
var _ = require('lodash');

module.exports = {

  attributes: {
    username: 'String',
    password: 'String',
    decks: {
      type: 'Array',
      defaultsTo: []
    }
  },

  authenticate: function(username, password, callback){
    this.findOne().where({
      username: username,
      password: password
    }).exec(function(err, user){
      callback(user);
    });
  },

  addDeck: function(user, deck, callback){

    var decks = user.decks;

    // Setting Id
    var md5 = crypto.createHash('md5');
    md5.update(deck.name+new Date().toISOString())
    deck.id = md5.digest('hex');
    decks.push(deck);

    // Updating
    this.update({id: user.id}, {decks: decks}, function(err, users){
      callback(users[0]);
    });
  },

  updateDeck: function(user, deck, callback){

    // Searching
    for (var i in user.decks) {
      if (user.decks[i].id === deck.id) {
        user.decks[i].cards = deck.cards;
        break;
      }
    }

    // Updating
    this.update({id: user.id}, {decks: user.decks}, function(err, users){
      callback(users[0]);
    });
  },

  deleteDeck: function(user, deck_id, callback){

    // Kicking deck out

    var decks = _.reject(user.decks, function(deck){
      return deck.id === deck_id;
    });

    // Updating
    this.update({id: user.id}, {decks: decks}, function(err, users){
      callback(users[0]);
    });
  }
};