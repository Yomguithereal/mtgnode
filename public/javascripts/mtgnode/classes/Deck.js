/*
| -------------------------------------------------------------------
|  MTGNode Game Deck Abstraction
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
*/

function Deck(config){

	// Properties
	//-------------------
	var self = this;

	// Model
	this.count = config.count;

	// DOM
	this.area = config.area;
	this.cards = config.cards;
	this.counter = config.counter;
	this.helper = config.helper;

	this.left = $(this.area).position().left;
	this.top = $(this.area).position().top;

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

	// Shuffling
	this.shuffleFromClient = function(){
		$cards = $(this.cards);
		$cards.shuffle();

		// Preparing data to send
		var shuffle = [];
		$(this.cards).each(function(i){
			shuffle.push($(this).attr("card_id"));
		});

		// Return the shuffle
		return shuffle;
	}
	this.shuffleFromServer = function(shuffle){

		// Reorganizing DOM
		$.each(shuffle, function(i){
			$(self.area).append($(self.helper.opponent_card(shuffle[i])));
		});
	}

	// To Hand
	this.to_hand = function($card, hand){

		// Class Operation
		$card.removeClass('in-deck');
		$card.addClass('in-hand');

		// Updating its z-index
		// this.helper.update_zindex($card);

		hand.increment();
		this.decrement();
	}

	// Draw Full Hand
	this.draw_full_hand = function(){

		// Looping seven times
		for(var i = 0; i < 7; i++){
			$(this.cards).eq(0).trigger('click');
		}
	}

	// Getting cards back
	this.card_on_top = function($card){

		// Putting card on top
		this.helper.conceal_card($card);
		$(this.area).prepend($card);

		// Reaxing card
		$card.animate({
			'left' : this.left
			,'top' : this.top
		}, 'fast');

		// Disabling draggable
		$card.draggable('disable');

		// Removing tapped
		$card.removeClass('tapped');
	}

}
