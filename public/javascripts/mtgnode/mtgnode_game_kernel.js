/*
| -------------------------------------------------------------------
|  MTGNode Game Kernel
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
*/

// Determining room
var socket = io.connect('/game');
var room = location.href.split('?')[1];

// User info
var user = {
	id : $("#USER_ID").val(),
	name : $("#USERNAME").val(),
	game_side : false,
	opponent_side : false
};

function MTGNodeGameKernel(){


	/*
	| ---------------
	|  Initialization
	| ---------------
	*/
	var self = this;
	this.ready = false;

	// Debug mode
	this.debug = false;
	if(typeof room == 'undefined'){
		socket.emit('debugGame');
		this.debug = true;
		this.ready = true;
	}

	// Selectors
	var $start_game_modal = $("#start_game_modal");
	var $start_game = $("#start_game");
	var $deck_select = $("#deck_select");

	/*
	| ------------------
	|  Starting the game
	| ------------------
	*/

	// Send player infos to server
	socket.emit('registerPlayer', {room : room});

	// Acts when server responds
	socket.on('kickPlayer', function(){
		location.href = '/kicked';
	});

	// Getting game side
	socket.on('gameSide', function(game_side){
		user.game_side = game_side;

		// Setting some classes to assert what is yours an what is not
		if(game_side == 'player1'){
			$('.player1').addClass('mine');
			$('.player2').addClass('opponent');
			user.opponent_side = 'player2';
		}
		else{
			$('.player2').addClass('mine');
			$('.player1').addClass('opponent');
			user.opponent_side = 'player1';
		}

	});

	// Triggering deck modal
	socket.on('chooseDeck', function(){
		$start_game_modal.modal('show');

		if(self.debug){
			$start_game.trigger('click');
		}
	});

	// Chosing your deck
	$start_game.click(function(){

		// Loading your cards
		var chosen_deck_id = $deck_select.val();

		// Sending your choice to server
		socket.emit('chosenDeck', {body : chosen_deck_id, room : room});

		// Getting them ajaxwise
		$.post('ajax/deck_cards', {deck_id : chosen_deck_id, game_side : 'mine'}, function(data){
			$start_game_modal.modal('hide');

			// Populating the deck
			$('.deck-emplacement.'+user.game_side).append(data);

			// Ready?
			if(self.ready){
				MTGNodeGameOperator();
			}
			else{
				self.ready = true;
			}

		});
	});

	// Getting opponent deck's back
	socket.on('opponentDeck', function(opponent_deck_id){

		// Getting them ajaxwise
		$.post('ajax/deck_cards', {deck_id : opponent_deck_id, game_side : 'opponent'}, function(data){
			$('.deck-emplacement.'+user.opponent_side).append(data);

			// Ready?
			if(self.ready){
				MTGNodeGameOperator();
			}
			else{
				self.ready = true;
			}

		});
	});

}


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
	var my_life_counter = '.life-counter.mine';
	var my_update_life = '.update-life.mine';
	var opponent_life_counter = '.life-counter.opponent';
	var my_cemetery = '.cemetery-emplacement.mine';

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
	var opponent_deck_card = '.card-min.in-deck.mine';
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
	function draw_full_hand(cards, deck, hand){
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
					draw_full_hand(my_deck_card, MY_DECK, MY_HAND);

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
				draw_full_hand(opponent_deck_card, OP_DECK, OP_HAND);
				break;

			// Opponent Reorganize its hand
			case 'reorganizingHand' :
				OP_HAND.reorganize();
				break;

			default:
				break;
		}
	});


}