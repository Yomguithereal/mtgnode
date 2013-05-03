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

	// Harcoded login for the time being
	if((req.body.username == 'Yomgui') || (req.body.username == 'Nibor')){
		if(req.body.password == 'nifluril'){

			// Registering user
			req.session.user_id= req.body.username;
			res.send('success');
			return false;
		}
	}

	res.send('fail');
	return false;
};
