/*
| -------------------------------------------------------------------
|  MTGNode Ajax Controller
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
*/


// Login Attempt
//-------------------
exports.loginAttempt = function(req, res){

	// Loading the model
	var UserModel = require('../model/user.js');

	// Checking if the user is registered
	UserModel.checkLogin(req.body.username, req.body.password, function(result){
		if(result){
			req.session.user_id= req.body.username;
			res.send('success');
			return false;
		}
		else{
			res.send('fail');
			return false;
		}
	});
};


// Selecting a set
//-------------------
exports.selectSet = function(req, res){

	// Loading the model
	var SetModel = require('../model/set.js');

	var cards = SetModel.getSetCards(req.body.selected_set);
	res.render('parts/deckbuilder_set', { 'cards' : cards});
}