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
	var $deck_selector = $('#deck_select');
	var $search_cards = $('#card_search_button');

	var $main_container = $('#deck_builder_container');
	var $left_panel = $('#deck_builder_left_panel');
	var $right_panel = $('#deck_builder_right_panel');

	var $create_deck = $("#create_deck_confirm");
	var $save_button = $('#save_deck');
	var $delete_button = $('#delete_deck_confirm');
	var $deck_name = $('#deck_name');
	var $card_counter = $('#card_counter');

	// Objects
	function Card(set_code, number){
		this.set_code = set_code;
		this.number = number;
	}

	function Deck(){
		this.name = '';
		this.cards = [];
		this.id = 0;

		this.setName = function(name){
			this.name = name;
		}

		this.setId = function(id){
			this.id = id;
		}

		this.addCard = function(set_code, number){
			// Updating model
			this.cards.push(new Card(set_code, number));
			// Updating counter
			$card_counter.text(this.cards.length);
		}

		this.removeCard = function(id){
			// Updating model
			this.cards.splice(id, 1);
			// Updating counter
			$card_counter.text(this.cards.length);
		}

		this.reinitialize = function(id, name){
			this.id = id;
			this.name = name;
			this.cards = [];

			// Updating counter
			$card_counter.text(0);

		}
	}
	this.DECK = new Deck();


	// Card Viewer Widget
	//-------------------
	$main_container.on('mouseover', $card, function(e){
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

	// Searching for Cards
	//--------------------
	$search_cards.click(function(){

		// Getting the request
		var query = $("#card_search").val();
		if($.trim(query) == ""){ return false; }

		$search_cards.button('loading');
		$left_panel.load('ajax/specific_cards', {'query' : query}, function(){
			$search_cards.button('reset');
		});
	});

	// Changing Deck
	//-------------------
	$deck_selector.change(function(){
		var deck = $(this).val();
		var deck_name = $("option[value="+deck+"]").text();

		// If deck is not selected, we do not bother
		if(deck == 'empty'){
			return false;
		}
		else{

			// Getting the cards through ajax
			$right_panel.load('ajax/deck_cards', {deck_id : deck}, function(){

				// Setting the deck information
				self.DECK.reinitialize(deck, deck_name);
				$('#deck_builder_right_panel > .card-min').each(function(){
					self.DECK.addCard($(this).attr('set_code'), $(this).attr('card_number'));
				});

				// Setting the name
				$deck_name.val(self.DECK.name);
			});
		}

	});

	// Updating Deck Name
	//-------------------
	$deck_name.change(function(){
		var new_name = $(this).val();
		self.DECK.setName(new_name);
	});

	// Creating Deck
	//-------------------
	$create_deck.click(function(){

		var name = $("#new_deck_name").val();
		if($.trim(name) == ''){ return false; }

		// Setting infos
		$deck_name.val(name);
		self.DECK.reinitialize(0, name);
		$right_panel.empty();

		// Closing the modal
		$("#new_deck_modal").modal('hide');
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

	// Saving the Deck
	//----------------------
	$save_button.click(function(){

		// Stopping if name is not here
		if($.trim(self.DECK.name) == ''){
			alert('Deck name not given');
			return false;
		}

		// Sending the deck to the server
		if(self.DECK.id === 0){
			$.post('ajax/save_deck', {name : self.DECK.name, cards : self.DECK.cards}, function(){
				location.href = location.href;
			});
		}
		else{
			$.post('ajax/update_deck', {deck_id: self.DECK.id, name : self.DECK.name, cards : self.DECK.cards}, function(){
				location.href = location.href;
			});
		}
	});

	// Deleting the Deck
	//----------------------
	$delete_button.click(function(){

		// Checking if deck is
		if(self.DECK.id === 0){
			return false;
		}

		// Deleting through ajax
		$.post("ajax/delete_deck", {deck_id : self.DECK.id}, function(){
			location.href = location.href;
		});

	});


	// Enter Key Mapping
	//----------------------
	$(document).keypress(function(event){

		if(!$('textarea').is(":focus")){

			var keycode = (event.keyCode ? event.keyCode : event.which);
			if(keycode == '13'){

				if($('.active_enter').length != 0){
					if($('.active_enter').is(":visible")){
						$('.active_enter').trigger("click");
						return false;
					}
				}
				return false;
			}
		}
	});



}