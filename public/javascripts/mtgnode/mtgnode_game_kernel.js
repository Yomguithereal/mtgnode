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

	// Game info
	var game_params = location.href.split('?')[1].split('||');
	var game = {
		name : game_params[0],
		host : game_params[1]
	};

	// Selectors
	var $start_game_modal = $("#start_game_modal");
	var $start_game = $("#start_game");
	var $deck_select = $("#deck_select");

	/*
	| --------
	|  Helpers
	| --------
	*/

	// Game message data formatting
	function gmd(data){

		// Always send user and game information
		this.user = user;
		this.game = game;

		// Body of the message
		this.body = data;
	}

	// Opponent card id
	function opponent_card(card_id){
		return '#card'+card_id+'_opponent';
	}

	// Flipping a card
	function flip_card($card){
		if($card.attr('src') == card_back){
			$card.attr('src', $card.attr('true_src'));
		}
		else{
			$card.attr('src', card_back);
		}
	}

	// Drawing card
	function deck_to_hand($card){
		$card.removeClass('in-deck');
		$card.addClass('in-hand');
	}

	// Revealing a card
	function hand_to_game($card){
		$card.removeClass('in-hand');
		$card.addClass('in-game');
	}

	// Tapping a card
	function tap_card($card){
		$card.toggleClass('tapped');
	}



	/*
	| ---------------
	|  Player Actions
	| ---------------
	*/

	// Send player infos to server
	socket.emit('registerPlayer', {user : user, game : game});

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
		socket.emit('chosenDeck', new gmd(chosen_deck_id));

		// Getting them ajaxwise
		$.post('ajax/deck_cards', {deck_id : chosen_deck_id, game_side : 'mine'}, function(data){
			$start_game_modal.modal('hide');

			// Populating the deck
			$('div.'+user.game_side).append(data);

			// Calling on the draggable
			draggable_register();
		});
	});

	// Getting opponent deck's back
	socket.on('opponentDeck', function(opponent_deck_id){

		// Getting them ajaxwise
		$.post('ajax/deck_cards', {deck_id : opponent_deck_id, game_side : 'opponent'}, function(data){
			$('div.'+user.opponent_side).append(data)
		});
	});




	/*
	| -------------
	|  Card Actions
	| -------------
	*/



	// Variables
	//-------------

	// Selectors
	var $card_viewer = $('#card_viewer_widget');
	var $game_area = $('.game-area');

	// Variables
	var flipped_card_image = '/images/card-back.jpeg'
	var ingame_card = '.card-min';
	var my_card = '.card-min.mine'
	var my_hand_card = '.card-min.in-hand.mine';
	var my_ingame_card = '.card-min.in-game.mine';



	// Card Viewer Widget
	//-------------------
	$game_area.on('mouseover', ingame_card, function(e){
		var src_to_see = $(e.target).attr('src');
		$card_viewer.attr('src', src_to_see);
	});


	// Dragging a Card
	//----------------

	// Sending
	function draggable_register(){
		$(my_card).draggable({
			'containment' : '.game-area',
			'stack' : '.card-min',
			drag : function(event, ui){

				// Getting coordinates
				var coordinates = {'card' : ui.helper.attr('card_id'), 'zindex' : ui.helper.css('z-index'),'top' : ui.position.top, 'left' : ui.position.left}

				// Sending the message
				socket.emit('draggingCard', new gmd(coordinates));
			},
			stop : function(event, ui){

				// If card comes from deck
				var $card = ui.helper;
				if($card.hasClass('in-deck')){

					// Adding the class
					deck_to_hand($card);

					// Flipping it for me
					flip_card($card);
					$card.trigger('mouseenter');

					// Sending information to server
					socket.emit('drawingCard', new gmd($card.attr('card_id')));
				}

			}
		});
	}

	// Getting dragging
	socket.on('draggingCard', function(coordinates){

		// Moving the card
		$(opponent_card(coordinates.card)).css({
			'left' : coordinates.left,
			'top' : coordinates.top,
			'z-index' : coordinates.zindex
		});
	});

	// Getting drawing
	socket.on('drawingCard', function(card_id){

		// Shifting classes
		deck_to_hand($(opponent_card(card_id)));
	});


	// Revealing a card
	//----------------

	// Sending
	$game_area.on('dblclick', my_hand_card, function(e){
		var $card = $(e.target);

		// Flipping the card
		hand_to_game($card);

		// Sending information to server
		socket.emit('revealingCard', new gmd($card.attr('card_id')));
	});

	// Getting
	socket.on('revealingCard', function(card_id){

		// Flipping the card and revealing it
		var $card = $(opponent_card(card_id));
		hand_to_game($card);
		flip_card($card);
	});



	// Tapping a card
	//----------------

	// Sending
	$game_area.on('contextmenu', my_ingame_card, function(e){

		e.preventDefault();
		var $card = $(e.target);

		// Flipping the card
		tap_card($card);

		// Sending information to server
		socket.emit('tappingCard', new gmd($card.attr('card_id')));

		return false;
	});

	// Getting
	socket.on('tappingCard', function(card_id){

		// Flipping the card and revealing it
		var $card = $(opponent_card(card_id));
		tap_card($card);
	});



}