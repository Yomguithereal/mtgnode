/*
| -------------------------------------------------------------------
|  Game Object
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Version : 1.0
*/

// Dependancies

// Object
function GameObject(name, host){
	this.name = name;
	this.isFull = false;
	this.host = host;
	this.player1 = {
		socket : false,
		deck : false
	};
	this.player2 = {
		socket : false,
		deck : false
	};

	this.gameForClient = function(){
		return {name : this.name, host : this.host};
	}
}

module.exports = GameObject;