/*
| -------------------------------------------------------------------
|  User Model
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Version : 1.0
*/

// Dependancies

// Object
function UserModel(){

	var self = this;

	this.checkLogin = function(username, password, callback){
		DB.get('SELECT id from users WHERE username = ? AND password = ?', [username, password], function(err, row){
			console.log(row);
			if(row){
				callback(row);
			}
			else{
				callback(false);
			}
		});
	}


}

module.exports = new UserModel();