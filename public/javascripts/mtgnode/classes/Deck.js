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
	this.container = config.container;
	this.$counter = $(config.counter);

	this.$search_deck_modal = $("#search_deck_modal");

	this.left = $(this.area).offset().left;
	this.top = $(this.area).offset().top;

	this.$counter.text(this.count);


	// Methods
	//-------------------

	// Losing a card
	this.decrement = function(){
		this.count -= 1;
		this.$counter.text(this.count);
	}

	// Gaining a card
	this.increment = function(){
		this.count += 1;
		this.$counter.text(this.count);
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
			$(self.container).append($(self.helper.opponent_card(shuffle[i])));
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
		$(this.container).prepend($card);

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

	// Searching for a card
	this.search_card = function(){

		// Populating the modal
		$(this.cards).each(function(){
			self.$search_deck_modal.children('.modal-body').append('<img src="'+$(this).children('.front-side').attr('src')+'" class="card-min-deckbuilder" />');
		});

		this.$search_deck_modal.modal('show');
	}

}
