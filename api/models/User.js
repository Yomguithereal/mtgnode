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
		this.findOne().where({username: username, password: password}).exec(function(err, user){
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
		var update_id;
		_.forEach(user.decks, function(current, index){
			if(current.id == deck.id){
				update_id = index;
				return false;
			}
		});
		user.decks[update_id].cards = deck.cards;

		// Updating
		this.update({id: user.id}, {decks: user.decks}, function(err, users){
			callback(users[0]);
		});
	},

	deleteDeck: function(user, deck_id, callback){
		
		// Kicking deck out

		var decks = _.reject(user.decks, function(deck){
			return deck.id == deck_id;
		});

		// Updating
		this.update({id: user.id}, {decks: decks}, function(err, users){
			callback(users[0]);
		});
	}
};