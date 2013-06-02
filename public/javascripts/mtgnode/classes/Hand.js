/*
| -------------------------------------------------------------------
|  MTGNode Game Hand Abstraction
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
|
*/

function Hand(config){

	// Properties
	//-------------------
	var self = this;

	// Model
	this.count = 0;
	this.visual_offset = 30;

	// DOM
	this.area = config.area;
	this.left = $(this.area).position().left;
	this.cards = config.cards;
	this.counter = config.counter;
	this.helper = config.helper;

	// Methods
	//-------------------

	// Losing a card
	this.decrement = function(){
		this.count -= 1;
		this.reorganize();
	}

	// Gaining a card
	this.increment = function(){
		this.count += 1;
		this.reorganize();
	}

	// Reorganize Hand
	this.reorganize = function(){
		$($(this.cards).get().reverse()).each(function(i){

			// Getting to position
			var to_position = self.left + (self.visual_offset*i);

			// Updating z-index
			self.helper.update_zindex($(this));

			// Animating the card
			$(this).animate({'left' : to_position}, 'fast');
		});
	}

}
