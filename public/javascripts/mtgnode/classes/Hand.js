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
	this.base_visual_offset = 77;
	this.visual_offset = this.base_visual_offset;

	// DOM
	this.area = config.area;
	this.left = $(this.area).position().left;
	this.width = $(this.area).width();
	this.cards = config.cards;
	this.counter = config.counter;
	this.helper = config.helper;

	// Methods
	//-------------------

	// Losing a card
	this.decrement = function(){
		this.count -= 1;
		this.reorganize();

		// Unsqueeze hand
		if((this.width - (this.count * this.visual_offset)) > this.visual_offset){
			this.visual_offset += 10;

			// Cannot go further than base
			if(this.visual_offset > this.base_visual_offset){
				this.visual_offset = this.base_visual_offset;
			}
		}
	}

	// Gaining a card
	this.increment = function(){
		this.count += 1;
		this.reorganize();
	}

	// Reorganize Hand
	this.reorganize = function(){

		var $cards = $(this.cards);

		// Checking remaining place in hand
		if($cards.length * this.visual_offset > this.width-this.base_visual_offset){
			this.visual_offset -= 10;
		}

		$($cards.get().reverse()).each(function(i){

			// Getting to position
			var to_position = self.left + (self.visual_offset*i);

			// Updating z-index
			self.helper.update_zindex($(this));

			// Animating the card
			$(this).animate({'left' : to_position}, 'fast');
		});
	}

	// To Game
	this.to_game = function($card, game){

		// Updating Classes
		$card.removeClass('in-hand');
		$card.addClass('in-game');

		// Updating Model
		this.decrement();
		game.increment();
	}

	// To Deck
	this.to_deck = function($card, deck){

		// Updating Classes
		$card.removeClass('in-hand');
		$card.addClass('in-deck');

		// Updating Model
		this.decrement();
		deck.increment();
		deck.card_on_top($card);
	}

}
