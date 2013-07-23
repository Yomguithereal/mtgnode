/**
 * User
 *
 * @module      :: Model
 * @description :: Application users
 *
 */

module.exports = {

	attributes: {
		username: 'String',
		password: 'String',
		decks: 'Array'
	},

	authenticate: function(username, password, callback){
		this.find().where({username: username, password: password}).exec(function(err, result){
			callback(result.length > 0);
		});
	}
};
