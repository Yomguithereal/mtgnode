/*
| -------------------------------------------------------------------
|  Sets Model -- magiccards.info Driver
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Version : 1.0
*/

// Dependancies

// Object
function SetModel(){

	var self = this;
	var scan_base_url = 'http://magiccards.info/scans/en/'

	// Loading config file
	var setInfos = require('./config/setinfo.js');

	// Get the sets informations
	this.getSetsList = function(){
		return setInfos;
	}

	// Get all the cards src of a set
	this.getSetCards = function(set){

		var cards = [];
		for(i=1; i <= setInfos[set].maxCard; i++){
			cards.push(scan_base_url+setInfos[set].code+'/'+i+'.jpg');
		}

		// Getting the cards back
		return cards;
	}


}

module.exports = new SetModel();