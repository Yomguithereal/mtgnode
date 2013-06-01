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

	// Debug mode
	this.debug = false;
	if(typeof room == 'undefined'){
		socket.emit('debugGame');
		this.debug = true;
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

			// Invoking the beginning of the game
			MTGNodeGameOperator();
		});
	});

	// Getting opponent deck's back
	socket.on('opponentDeck', function(opponent_deck_id){

		// Getting them ajaxwise
		$.post('ajax/deck_cards', {deck_id : opponent_deck_id, game_side : 'opponent'}, function(data){
			$('.deck-emplacement.'+user.opponent_side).append(data)
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

	// Cards //
	var card_to_see = '.card-min';
	var my_card = '.card-min.mine';
	var my_deck_card = '.card-min.in-deck.mine';
	var my_hand_card = '.card-min.in-hand.mine';
	var my_ingame_card = '.card-min.in-game.mine';
	var my_hand_area = '.hand-emplacement.mine';
	var my_snap_to = '.hand-emplacement.mine, .deck-emplacement.mine, .cemetery-emplacement.mine'


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

	// Deck Abstraction
	function Deck(count){
		this.count = count;

		this.decrement = function(){
			this.count -= 1;
		}
	}
	DECK = new Deck($('.in-deck.mine').length);

	// Hand Abstraction
	function Hand(){
		var self = this;
		this.count = 0;
		this.left = $(my_hand_area).position().left;

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
			$($(my_hand_card).get().reverse()).each(function(i){
				var to_position = self.left + (operator.hand_offset*i);
				$(this).animate({'left' : to_position}, 'fast');
			});
		}
	}
	HAND = new Hand();

	// Cemetery Abstraction
	function Cemetery(){
		this.count = 0;
	}
	CEMETERY = new Cemetery();


	// Function generating opponent's cards ids
	function opponent_card(card_id){
		return '#card'+card_id+'_opponent';
	}

	// Function used to update cards z-index
	function update_zindex($card){
		operator.max_zindex += 1;
		$card.css('z-index', self.max_zindex);
	}

	/*
	| ------------------
	|  Starters
	| ------------------
	*/

	// Deck Shuffling
	//-------------------
	$(my_deck_card).shuffle();

	// Card Viewer Widget
	//-------------------
	$game_area.on('mouseover', card_to_see, function(e){
		var src_to_see = $(e.target).attr('src');

		// We block the action if the src is already the same to prevent useless HTTP requests
		if($card_viewer.attr('src') != src_to_see){
			$card_viewer.attr('src', src_to_see);
		}
	});

	/*
	| -------------------------
	|  From Client Interactions
	| -------------------------
	*/

	// Drawing a Card
	//----------------

	// Logic
	function reveal_card($card){
		var $img = $card.children('img');
		if($img.attr('src') == card_back_src){
			$img.attr('src', $img.attr('true_src'));
		}
	}

	function deck_to_hand($card){

		// Class Operation
		$card.removeClass('in-deck');
		$card.addClass('in-hand');

		// Updating its z-index
		update_zindex($card);

		HAND.increment();
		DECK.decrement();

		// Revealing card for player
		reveal_card($card);

	}

	// Action
	$game_area.on('click', my_deck_card, function(e){
		var $card = $(this);

		// Using Logic
		deck_to_hand($card);

		// Make the card draggable
		register_draggable($card);

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
		});
	}

	function hand_to_game($card){

		// Updating Classes
		$card.removeClass('in-hand');
		$card.addClass('in-game');

		// Updating Model
		HAND.decrement();
	}

	function game_to_hand($card){

		// Updating Classes
		$card.removeClass('in-game');
		$card.addClass('in-hand');

		// Updating Model
		HAND.increment();
	}

	// Droping Cards
	//------------------

	// In Game
	$game_zone.droppable({
		drop : function(event, ui){

			// When a card enter the game zone, we acknowledge its ingame nature
			var $card = $(ui.draggable);
			hand_to_game($card);

		}
	});

	// In Hand
	$(my_hand_area).droppable({
		drop : function(event, ui){

			var $card = $(ui.draggable);

			// If card is already in hand, we cancel the event
			if($card.hasClass('in-hand')){
				HAND.reorganize();
				return false;
			}

			// If card comes from game
			if($card.hasClass('in-game')){

				game_to_hand($card);
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

	/*
	| -------------------------
	|  From Server Interactions
	| -------------------------
	*/
	socket.on(this.generic_message, function(data){

		// Switch on message kind
		switch(data.head){
			case 'Test' :
				break;
			default:
				break;
		}
	});












	// Dragging a Card
	//----------------

	// Sending
	/*
	function draggable_register(){
		$(my_card).draggable({
			'containment' : '.game-area',
			'stack' : '.card-min',
			snap : my_cemetery,
			grid : [10, 10],
			drag : function(event, ui){

				// Getting coordinates
				var coordinates = {'card' : ui.helper.attr('card_id'), 'zindex' : ui.helper.css('z-index'),'top' : ui.position.top, 'left' : ui.position.left}

				// Sending the message
				socket.emit('draggingCard', new message(coordinates));
			},
			stop : function(event, ui){


			}
		});
	}
	*/

}