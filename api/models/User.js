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
		decks: {
			type: 'Array',
			defaultsTo: []
		}
	},

	authenticate: function(username, password, callback){
		this.findOne().where({username: username, password: password}).exec(function(err, user){
			callback(user);
		});
	}
};
