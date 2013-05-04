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
exports.login_attempt = function(req, res){

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
