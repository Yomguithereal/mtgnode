/*
| -------------------------------------------------------------------
|  MTGNode Card Templates
| -------------------------------------------------------------------
|
|
|	Author : Yomguithereal
|	Version : 1.0
*/

;(function(Driver, undefined){

	// Templates 
	//-----------
	function CardTemplate(id_prefix){

		// Properties
		var self = this;
		this._prefix = id_prefix || 'card';
		this._index = -1;
		this._driver = Driver;
		this._template = $('#tpl_card').html();

		// Methods
		this.render = function(card){
			this._index += 1;
			var data = {
				id_prefix: this._prefix
				,number: this._index
				,multiverseid: card.multiverseid
				,src: this._driver.getUrl(card)
			}
			return Mustache.to_html(this._template, data);
		}
	}

	// Exporting 
	//-----------
	window.CardTemplate = CardTemplate;
})(CardDriver);