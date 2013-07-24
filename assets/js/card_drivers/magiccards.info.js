/*
| -------------------------------------------------------------------
|  MTGNode Magiccards.info Display Driver
| -------------------------------------------------------------------
|
|
|	Author : Yomguithereal
|	Version : 1.0
*/

;(function(undefined){

	// Driver 
	//--------
	function CardDriver(){

		// Properties
		var self = this;
		this._baseUrl = 'http://magiccards.info/scans/en/';

		// Methods
		this.getUrl = function(card){
			return this._baseUrl+card.set_code.toLowerCase()+'/'+card.number+'.jpg';
		}
	}

	// Exporting 
	//-----------
	window.CardDriver = CardDriver;
})();