/*
| -------------------------------------------------------------------
|  MTGNode Login Controller
| -------------------------------------------------------------------
|
|
|	Author : Yomguithereal
|	Version : 1.0
*/

// Index
exports.login = function(req, res){

	// Killing last session
	req.session.authenticated = false;

	// Rendering the view
	res.view('login/login');
}

// Ajax Connection Attempt
exports.authenticate = function(req, res){

	// Interrogating Model
	User.authenticate(req.param('username'), req.param('password'), function(result){
		if(!!result){
			req.session.authenticated = true;
		}
		res.json({authenticated: result});
	});
}