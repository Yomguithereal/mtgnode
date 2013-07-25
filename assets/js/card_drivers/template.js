/*
| -------------------------------------------------------------------
|  MTGNode Card Templates
| -------------------------------------------------------------------
|
|
|	Author : Yomguithereal
|	Version : 1.0
*/

;(function(undefined){

	// Templates 
	//-----------
	function CardTemplate(){

		// Properties
		var self = this;
		this._index = -1;
		this._driver = new CardDriver();
		this._template = $('#tpl_card').html();

		// Methods
		this.render = function(card){
			this._index += 1;
			var data = {
				number: this._index
				,multiverseid: card.multiverseid
				,src: this._driver.getUrl(card)
			}
			return Mustache.to_html(this._template, data);
		}
	}

	// Exporting 
	//-----------
	window.CardTemplate = CardTemplate;
})();