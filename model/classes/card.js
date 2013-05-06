/*
| -------------------------------------------------------------------
|  Card Object
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Version : 1.0
*/

// Dependancies

// Object
function CardObject(set, set_code, number, url){
	this.set = set;
	this.set_code = set_code;
	this.number = number;
	this.base_url = url;
}

module.exports = CardObject;