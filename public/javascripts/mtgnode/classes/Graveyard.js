/*
| -------------------------------------------------------------------
|  MTGNode Game Graveyard Abstraction
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
|
*/

function Graveyard(config){

	// Properties
	//-------------------
	var self = this;

	// Model
	this.count = 0;

	// DOM
	this.area = config.area;
	this.left = $(this.area).offset().left;
	this.top = $(this.area).offset().top;
	this.cards = config.cards;
	this.counter = config.counter;
	this.helper = config.helper;


	// Methods
	//-------------------

	// Losing a card
	this.decrement = function(){
		this.count -= 1;
	}

	// Gaining a card
	this.increment = function(){
		this.count += 1;
	}

	// Getting cards back
	this.card_on_top = function($card){

		// Revealing card
		this.helper.reveal_card($card);

		// Reaxing card
		$card.animate({
			'left' : this.left
			,'top' : this.top
		}, 'fast', function(){console.log($card.position().top);});

		// Removing tapped
		$card.removeClass('tapped');
	}

}
