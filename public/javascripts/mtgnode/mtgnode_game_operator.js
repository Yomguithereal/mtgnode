/*
| -------------------------------------------------------------------
|  MTGNode Game Operator
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
*/

function MTGNodeGameOperator(){


	/*
	| ------------------
	|  Variables
	| ------------------
	*/

	// Object Operation and Configuration //
	var operator = this;
	this.last_message = 'none';
	this.generic_message = 'gameUpdate';
	this.max_zindex = 30;
	this.hand_offset = 30;
	this.drag_grid = [10, 10];

	// Areas //
	var $card_viewer = $('#card_viewer_widget');
	var $game_area = $('.game-area');
	var $game_zone = $('.game-emplacement');
	var $helper_block = $('#helper_block');

	// Values //
	var card_back_src = $("#CARDBACK").val();

	// Interface //
	var $update_life = $(".update-life.mine");
	var $starting_player = $("#starting_player");

	var $my_life_counter = $(".life-counter.mine");
	var $my_message_receiver = $(".message-receiver.mine");
	var $my_turn_indicator = $(".turn-indicator.mine");

	var $opponent_life_counter = $(".life-counter.opponent");
	var $opponent_message_receiver = $(".message-receiver.opponent");
	var $opponent_turn_indicator = $(".turn-indicator.opponent");

	// Generic Cards //
	var card_to_see = '.card-min';

	// My Cards //
	var my_card = '.card-min.mine';
	var my_deck_card = '.card-min.in-deck.mine';
	var my_hand_card = '.card-min.in-hand.mine';
	var my_ingame_card = '.card-min.in-game.mine';
	var my_hand_area = '.hand-emplacement.mine';
	var my_game_area = '.game-emplacement.mine';
	var my_snap_to = '.hand-emplacement.mine, .deck-emplacement.mine, .cemetery-emplacement.mine';

	// Opponent Cards //
	var opponent_deck = '.deck-emplacement.opponent';
	var opponent_deck_card = '.card-min.in-deck.opponent';
	var opponent_hand_card = '.card-min.in-hand.opponent';
	var opponent_hand_area = '.hand-emplacement.opponent';
	var opponent_ingame_card = '.card-min.in-game.opponent';


	/*
	| ------------------
	|  Helpers
	| ------------------
	*/

	// Message to server abstraction
	function message(message, data){

		// Room information
		this.room = room;

		// Head of the message
		this.head = message;

		// Body of the message
		this.body = data;

		// Send the message
		this.send = function(){
			socket.emit(operator.generic_message, {
				head : this.head,
				room : this.room,
				body : this.body
			});

			// Registering the last message
			operator.last_message = this;
		}
	}

	// Function generating opponent's cards selectors
	function opponent_card(card_id){
		return $('#card'+card_id+'_opponent');
	}

	// Function used to update cards z-index
	function update_zindex($card){
		operator.max_zindex += 1;
		$card.css('z-index', self.max_zindex);
	}

	// Function to print message
	function notify($receiver, text, type){
		type = type || 'valid';

		$receiver.text(text);
		$receiver.removeClass('valid error');
		$receiver.addClass(type);
	}

	/*
	| ------------------
	|  Model
	| ------------------
	*/

	// Deck Abstraction
	//-------------------
	function Deck(count){
		this.count = count;

		this.decrement = function(){
			this.count -= 1;
		}
	}
	var MY_DECK = new Deck($('.in-deck.mine').length);
	var OP_DECK = new Deck($('.in-deck.opponent').length);




	// Hand Abstraction
	//-------------------
	function Hand(hand_area, hand_cards){
		var self = this;
		this.count = 0;
		this.left = $(hand_area).position().left;

		this.increment = function(){

			// Updating counter
			this.count += 1;

			// Reorganizing hand
			this.reorganize();
		}
		this.decrement = function(){

			// Updating counter
			this.count -= 1;

			// Reorganizing hand
			this.reorganize();
		}
		this.reorganize = function(){
			$($(hand_cards).get().reverse()).each(function(i){
				var to_position = self.left + (operator.hand_offset*i);
				update_zindex($(this));
				$(this).animate({'left' : to_position}, 'fast');
			});
		}
	}
	var MY_HAND = new Hand(my_hand_area, my_hand_card);
	var OP_HAND = new Hand(opponent_hand_area, opponent_hand_card);


	// Cemetery Abstraction
	//---------------------
	function Cemetery(){
		this.count = 0;
	}
	var MY_CEMETERY = new Cemetery();
	var OP_CEMETERY = new Cemetery();


	/*
	| -------------------------
	|  Starters
	| -------------------------
	*/

	// Deck Shuffling
	shuffle_my_deck();

	// Card Viewer Widget
	$game_area.on('mouseover', card_to_see, function(e){
		var src_to_see = $(e.target).attr('src');

		// We block the action if the src is already the same to prevent useless HTTP requests
		if(($card_viewer.attr('src') != src_to_see)){
			$card_viewer.attr('src', src_to_see);
		}
	});

	// Determining the starting player
	if($starting_player.hasClass('mine')){

		// Message
		notify($my_message_receiver, 'You start');

		// Indicator
		$my_turn_indicator.addClass('btn-success my-turn');
		$opponent_turn_indicator.addClass('btn-danger');
	}
	else{

		// Message
		notify($opponent_message_receiver, 'Your opponent starts', 'error');

		// Indicator
		$my_turn_indicator.addClass('btn-danger');
		$opponent_turn_indicator.addClass('btn-success my-turn');
	}


	/*
	| -------------------------
	|  From Client Interactions
	| -------------------------
	*/

	// Shuffling Deck
	//----------------
	function shuffle_my_deck(){
		var $cards = $(my_deck_card);
		$cards.shuffle();

		// Preparing data to send
		var shuffle = [];
		$(my_deck_card).each(function(i){
			shuffle.push($(this).attr("card_id"));

			// Sending data to opponent
			if(i == $cards.length-1){
				new message('shufflingDeck', shuffle).send();
			}
		});


	}

	function shuffle_opponent_deck(shuffle){

		// Reorganizing opponent's deck
		$.each(shuffle, function(i){
			$(opponent_deck).append($(opponent_card(shuffle[i])));
		});
	}

	// Drawing a Card
	//----------------

	// Logic
	function reveal_card($card){
		var $img = $card.children('img');
		if($img.attr('src') == card_back_src){
			$img.attr('src', $img.attr('true_src'));
		}
	}

	function conceal_card($card){
		var $img = $card.children('img');
		if($img.attr('src') != card_back_src){
			$img.attr('src', card_back_src);
		}
	}

	function deck_to_hand($card, deck, hand){

		deck = deck || MY_DECK;
		hand = hand || MY_HAND;

		// Class Operation
		$card.removeClass('in-deck');
		$card.addClass('in-hand');

		// Updating its z-index
		update_zindex($card);

		hand.increment();
		deck.decrement();

	}

	// Action
	$game_area.on('click', my_deck_card, function(e){

		// Getting first card of DOM
		// WARNING :: Get the last DOM card otherwise because of z-index rule
		var $card = $(my_deck_card).eq(0);

		// Using Logic
		deck_to_hand($card);

		// Make the card draggable
		register_draggable($card);

		// Revealing card for me only
		reveal_card($card);

		// Alerting server
		new message('drawingCard', $card.attr('card_id')).send();
	});


	// Dragging Cards
	//------------------

	// Logic
	function register_draggable($card){

		// Draggable
		$card.draggable({
			'containment' : '.game-area',
			snap : my_snap_to,
			grid : operator.drag_grid,
			drag : function(event, ui){

				// Card
				var $card = $(ui.helper);

				// Updating z-index
				update_zindex($card);

				// If mine
				var pos = {
					left : ui.position.left,
					top : ui.position.top,
					zindex : $card.css('z-index')
				}
				if($card.hasClass('mine')){
					new message('draggingCard', {position : pos, card : $card.attr('card_id')}).send();
				}
			}
		});
	}

	function hand_to_game($card, model){

		model = model || MY_HAND;

		// Updating Classes
		$card.removeClass('in-hand');
		$card.addClass('in-game');

		// Updating Model
		model.decrement();
	}

	function game_to_hand($card, model){

		model = model || MY_HAND;

		// Updating Classes
		$card.removeClass('in-game');
		$card.addClass('in-hand');
		$card.removeClass('tapped');

		// Updating Model
		model.increment();
	}

	// Droping Cards
	//------------------

	// In Game
	$game_zone.droppable({
		drop : function(event, ui){

			// When a card enter the game zone, we acknowledge its ingame nature
			var $card = $(ui.draggable);
			hand_to_game($card);

			// Sending message to server
			new message('playingCard', $card.attr('card_id')).send();

		}
	});

	// In Hand
	$(my_hand_area).droppable({
		tolerance : "fit",
		drop : function(event, ui){

			var $card = $(ui.draggable);

			// If card is already in hand, we cancel the event
			if($card.hasClass('in-hand')){
				MY_HAND.reorganize();

				// Sending message to server
				new message('reorganizingHand').send();
				return false;
			}

			// If card comes from game
			if($card.hasClass('in-game')){

				game_to_hand($card);

				// Sending message to server
				new message('backingCard', $card.attr('card_id')).send();
			}

		}
	});

	// Tapping Cards
	//------------------

	// Logic
	function tap_card($card){
		$card.toggleClass('tapped');
	}

	$game_area.on('contextmenu', my_ingame_card, function(e){
		var $card = $(this);
		e.preventDefault();

		// Tapping Card
		tap_card($card);

		// Sending information to server
		new message('tappingCard', $card.attr('card_id')).send();

		return false;
	});

	// Batch Untapping
	//------------------

	// Logic
	function batch_untap(cards){
		$(cards+'.tapped').removeClass('tapped');
	}

	// Action
	$.contextMenu({
		selector: my_game_area,
		zIndex : 100000,
		callback: function(key, options) {

			switch(key){

				case 'untapAll' :

					// Do not activate if there is no tapped card
					if($(my_ingame_card+'.tapped').length == 0){ break; }
					console.log("test");

					batch_untap(my_ingame_card);

					// Sending information to server
					new message('batchUntapping').send();
					break;

				default :
					break;
			}
		},
		items: {
			"untapAll": {name: "Untap all cards", icon: false},
		}
	});

	// Drawing Full Hand
	//------------------

	// Logic
	function draw_full_hand(cards){
		for(var i = 0; i < 7; i++){
			$(cards).eq(0).trigger('click');
		}
	}

	// Action
	$.contextMenu({
		selector: my_deck_card,
		zIndex : 100001,
		callback: function(key, options) {

			switch(key){

				case 'drawFullHand' :
					draw_full_hand(my_deck_card);

					// Sending information to server
					new message('drawingFullHand').send();
					break;

				default :
					break;
			}
		},
		items: {
			"drawFullHand": {name: "Draw a full hand", icon: false},
		}
	});

	// Updating Life
	//------------------

	// Logic
	function update_life($life_counter, type){
		var hitpoints = parseInt($life_counter.text());

		if(type){
			$life_counter.text(hitpoints+1);
		}
		else{
			$life_counter.text(hitpoints-1);
		}
	}

	// Action
	$update_life.click(function(){
		var type = $(this).hasClass('gain-life') ? true : false;

		update_life($my_life_counter, type);

		// Sending information to server
		new message('updatingLife', type).send();
	});

	// Finish Turn
	//------------------

	// Logic
	function finish_turn($indicator){
		$indicator.removeClass('my-turn btn-success');
		$indicator.addClass('btn-danger');
	}

	function start_turn($indicator){
		$indicator.removeClass('btn-danger');
		$indicator.addClass('btn-success my-turn');
	}

	// Action
	$my_turn_indicator.click(function(){
		// Preventing if not my turn
		var $indicator = $(this);
		if($indicator.hasClass('my-turn')){
			finish_turn($indicator);
			start_turn($opponent_turn_indicator);

			new message('finishingTurn').send();
		}
	});

	/*
	| -------------------------
	|  From Server Interactions
	| -------------------------
	*/

	socket.on(this.generic_message, function(data){

		// Switch on message kind
		switch(data.head){

			// Shuffling Deck
			case 'shufflingDeck' :
				shuffle_opponent_deck(data.body);
				break;

			// Drawing a Card
			case 'drawingCard' :
				deck_to_hand(opponent_card(data.body), OP_DECK, OP_HAND);
				break;

			// Dragging a Card
			case 'draggingCard' :
				var $card = opponent_card(data.body.card);

				$card.css({
					'left' : data.body.position.left,
					'top' : data.body.position.top,
					'z-index' : data.body.position.zindex
				});

				break;

			// Playing a Card
			case 'playingCard' :
				var $card = opponent_card(data.body);

				hand_to_game($card, OP_HAND);
				reveal_card($card);
				break;

			// Backing a Card
			case 'backingCard' :
				var $card = opponent_card(data.body);

				game_to_hand($card, OP_HAND);
				conceal_card($card);
				break;

			// Tapping a Card
			case 'tappingCard' :
				tap_card(opponent_card(data.body));
				break;

			// Batch Untapping
			case 'batchUntapping' :
				batch_untap(opponent_ingame_card);
				break;

			// Draw Full Hand
			case 'drawFullHand' :
				draw_full_hand(opponent_deck_card);
				break;

			// Opponent Reorganize its hand
			case 'reorganizingHand' :
				OP_HAND.reorganize();
				break;

			// Updating Life Counter
			case 'updatingLife' :
				update_life($opponent_life_counter, data.body);
				break;

			// Finishing Turn
			case 'finishingTurn' :
				finish_turn($opponent_turn_indicator);
				start_turn($my_turn_indicator);
				break;


			default:
				break;
		}
	});


}