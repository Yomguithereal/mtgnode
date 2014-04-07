/*
| -------------------------------------------------------------------
|  MTGNode Login Controller
| -------------------------------------------------------------------
|
| Author : Yomguithereal
| Version : 1.0
*/

// Index
exports.login = function(req, res) {

  // Killing last session
  req.session.authenticated = false;

  // Fetching every users
  User.find({}, function(err, users) {

    // Rendering the view
    res.view('login/login', {users: users});
  });
};

// Ajax Connection Attempt
exports.authenticate = function(req, res) {

  // Interrogating Model
  User.authenticate(
    req.param('username'),
    req.param('password'),
    function(err, user) {
      if(!err && user !== undefined){
        req.session.authenticated = true;
        req.session.user = user;
        res.json({authenticated: true});
        return false;
      }
      res.json({authenticated: false});
    }
  );
};
