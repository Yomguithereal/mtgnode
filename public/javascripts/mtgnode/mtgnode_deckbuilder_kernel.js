/*
| -------------------------------------------------------------------
|  MTGNode Deck Builder Kernel
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
*/


function MTGNodeDeckBuilderKernel(){

	var self = this;

	/*
	| -------------
	|  Card Actions
	| -------------
	*/

	// Variables
	//-------------

	// Selectors
	var $card_viewer = $('#card_viewer_widget');
	var $card = $('.card-min');

	var $set_selector = $('#set_select');
	var $left_panel = $('#deck_builder_left_panel');
	var $right_panel = $('#deck_builder_right_panel');

	// Objects
	function Card(set_code, number){
		this.set_code = set_code;
		this.number = number;
	}

	function Deck(){
		this.name = '';
		this.cards = [];

		this.setName = function(name){
			this.name = name;
		}

		this.addCard = function(set_code, number){
			this.cards.push(new Card(set_code, number));
		}

		this.removeCard = function(id){
			this.cards.splice(id, 1);
		}
	}
	this.DECK = new Deck();


	// Card Viewer Widget
	//-------------------
	$(document).on('mouseover', $card, function(e){
		var src_to_see = $(e.target).attr('src');
		$card_viewer.attr('src', src_to_see);
	});

	// Changing Extension
	//-------------------
	$set_selector.change(function(){

		// Getting the selected set
		var selected_set = $set_selector.val();
		if(selected_set != 'none'){

			// Calling ajax
			$left_panel.load('ajax/select_set', {'selected_set' : selected_set});
		}
	});

	// Add Card to Deck
	//-------------------
	$left_panel.on('click', $card, function(e){

		// Adding card to deck
		var $c = $(e.target);
		var card_number = $c.attr('card_number');
		var card_set_code = $c.attr('set_code');

		self.DECK.addCard(card_set_code, card_number);

		// Updating view
		$right_panel.append($c.clone());
	});

	// Remove Card from Deck
	//----------------------
	$right_panel.on('click', $card, function(e){

		// Adding card to deck
		var $c = $(e.target);

		self.DECK.removeCard($c.index());

		// Updating view
		$c.remove();
	});

}