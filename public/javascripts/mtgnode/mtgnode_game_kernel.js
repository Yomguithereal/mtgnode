/*
| -------------------------------------------------------------------
|  MTGNode Game Kernel
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
*/


function MTGNodeGameKernel(){


	/*
	| ---------------
	|  Initialization
	| ---------------
	*/

	var self = this;
	var socket = io.connect('/game');

	var card_back = '/images/card-back.jpeg';

	// User info
	var user = {
		id : $("#USER_ID").val(),
		name : $("#USERNAME").val(),
		game_side : false,
		opponent_side : false
	};

	// Determining room
	var room = location.href.split('?')[1];

	// Debug mode
	if(typeof room == 'undefined'){
		socket.emit('debugGame');
	}

	// Selectors
	var $start_game_modal = $("#start_game_modal");
	var $start_game = $("#start_game");
	var $deck_select = $("#deck_select");

	/*
	| --------
	|  Helpers
	| --------
	*/

	// Message data formatting
	function message(data){

		// Room information
		this.room = room;

		// Body of the message
		this.body = data;
	}

	// Opponent card id
	function opponent_card(card_id){
		return '#card'+card_id+'_opponent';
	}


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

		// Setting some classes to assert what is yours
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
	});

	// Chosing your deck
	$start_game.click(function(){

		// Loading your cards
		var chosen_deck_id = $deck_select.val();

		// Sending your choice to server
		socket.emit('chosenDeck', new message(chosen_deck_id));

		// Getting them ajaxwise
		$.post('ajax/deck_cards', {deck_id : chosen_deck_id, game_side : 'mine'}, function(data){
			$start_game_modal.modal('hide');

			// Populating the deck
			$('.deck-emplacement.'+user.game_side).append(data);
			// Shuffling deck
			$(my_deck_card).shuffle();

			// Calling on the draggable
			//draggable_register();
		});
	});

	// Getting opponent deck's back
	socket.on('opponentDeck', function(opponent_deck_id){

		// Getting them ajaxwise
		$.post('ajax/deck_cards', {deck_id : opponent_deck_id, game_side : 'opponent'}, function(data){
			$('.deck-emplacement.'+user.opponent_side).append(data)
		});
	});






	/*
	| ---------------
	|  Game Variables
	| ---------------
	*/

	// Selectors //

		// Areas //
	var $card_viewer = $('#card_viewer_widget');
	var $game_area = $('.game-area');
	var $helper_block = $('#helper_block')

	// Variables //

		// Values //
	var flipped_card_image = '/images/card-back.jpeg';

		// Interface //
	var my_life_counter = '.life-counter.mine';
	var my_update_life = '.update-life.mine';
	var opponent_life_counter = '.life-counter.opponent';
	var my_cemetery = '.cemetery-emplacement.mine';

		// Cards //
	var ingame_card = '.card-min';
	var my_card = '.card-min.in-hand.mine, .card-min.in-game.mine';
	var my_deck_card = '.card-min.in-deck.mine';
	var my_hand_card = '.card-min.in-hand.mine';
	var my_ingame_card = '.card-min.in-game.mine';
	var my_hand_area = '.hand-emplacement.mine';

	/*
	| ------------------
	|  Interface Actions
	| ------------------
	*/

	/*
	| -------------
	|  Card Actions
	| -------------
	*/


	// Card Viewer Widget
	//-------------------
	$game_area.on('mouseover', ingame_card, function(e){
		var src_to_see = $(e.target).attr('src');
		$card_viewer.attr('src', src_to_see);
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

	// Drawing a Card
	//----------------



}