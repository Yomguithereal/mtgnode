/*
| -------------------------------------------------------------------
|  MTGNode Game Helpers
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
*/

function Helper(){

	// Properties
	//-------------------
	this.max_zindex = 30;

	// Methods
	//-------------------

	// Function generating opponent's cards selectors
	this.opponent_card = function(card_id){
		return $('#card'+card_id+'_opponent');
	}

	// Function used to update cards z-index
	this.update_zindex = function($card){
		this.max_zindex += 1;
		$card.css('z-index', this.max_zindex);
	}

	// Function to print message
	this.notify = function($receiver, text, type){
		type = type || 'valid';

		$receiver.text(text);
		$receiver.removeClass('valid error');
		$receiver.addClass(type);
	}

}
