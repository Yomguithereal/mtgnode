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

	// Harcoded object containing set informations
	//		-- Subject to change
	var setInfos = {
		'alpha' : {
			block : 'core',
			code : 'al',
			maxCard : 295
		}
	};

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