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
			$('.deck-emplacement.'+user.game_side).append(data);
			// Shuffling deck
			$(my_deck_card).shuffle();

			// Calling on the draggable
			draggable_register();
		});
	});

	// Getting opponent deck's back
	socket.on('opponentDeck', function(opponent_deck_id){

		// Getting them ajaxwise
		$.post('ajax/deck_cards', {deck_id : opponent_deck_id, game_side : 'opponent'}, function(data){
			$('.player-side.'+user.opponent_side).append(data)
		});
	});

	/*
	| -------------
	|  Variables
	| -------------
	*/

	// Selectors
		// Areas
	var $card_viewer = $('#card_viewer_widget');
	var $game_area = $('.game-area');
	var $helper_block = $('#helper_block')

	// Variables
		// Values
	var flipped_card_image = '/images/card-back.jpeg';
		// Interface
	var my_life_counter = '.life-counter.mine';
	var my_update_life = '.update-life.mine';
	var opponent_life_counter = '.life-counter.opponent';
	var my_cemetery = '.cemetery-emplacement.mine';
		// Cards
	var ingame_card = '.card-min';
	var my_card = '.card-min.mine';
	var my_deck_card = '.card-min.in-deck.mine';
	var my_hand_card = '.card-min.in-hand.mine';
	var my_ingame_card = '.card-min.in-game.mine';

	/*
	| ------------------
	|  Interface Actions
	| ------------------
	*/

	// Updating life
	//----------------

	// Logic
	function update_life($life_counter, action){

		// Getting current life
		var current_hp = parseInt($life_counter.text());

		// Acting according parameter
		if(action == 'gain'){
			current_hp += 1;
		}
		else{
			current_hp -= 1;
		}

		$life_counter.text(current_hp);
	}

	// Sending
	$helper_block.on('click', my_update_life,function(){

		if($(this).hasClass('gain-life')){
			update_life($(my_life_counter), 'gain');
			socket.emit('updatingLife', new gmd('gain'));
		}
		else{
			update_life($(my_life_counter), 'lose');
			socket.emit('updatingLife', new gmd('lose'));
		}
	});

	// Getting
	socket.on('updatingLife', function(action){

		// Updating opponent
		update_life($(opponent_life_counter), action);
	});


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

	// Logic
	function flip_card($card){
		if($card.attr('src') == card_back){
			$card.attr('src', $card.attr('true_src'));
		}
		else{
			$card.attr('src', card_back);
		}
	}

	function deck_to_hand($card){
		$card.removeClass('in-deck');
		$card.addClass('in-hand');
	}

	// Sending
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


	// Revealing / Concealing a card
	//------------------------------

	// Logic
	function hand_to_game($card){
		$card.removeClass('in-hand');
		$card.addClass('in-game');
	}

	function game_to_hand($card){
		$card.removeClass('in-game');
		$card.addClass('in-hand');
	}


	// Sending
	$game_area.on('dblclick', my_hand_card+', '+my_ingame_card, function(e){
		var $card = $(e.target);

		if($card.hasClass('in-hand')){
			// Flipping the card
			hand_to_game($card);

			// Sending information to server
			socket.emit('revealingCard', new gmd($card.attr('card_id')));
		}
		else{
			// Flipping the card
			game_to_hand($card);

			// Sending information to server
			socket.emit('concealingCard', new gmd($card.attr('card_id')));
		}



	});

	// Getting
	socket.on('revealingCard', function(card_id){

		// Flipping the card and revealing it
		var $card = $(opponent_card(card_id));
		hand_to_game($card);
		flip_card($card);
	});

	socket.on('concealingCard', function(card_id){

		// Flipping the card and revealing it
		var $card = $(opponent_card(card_id));
		game_to_hand($card);
		flip_card($card);
	});



	// Tapping a card
	//----------------

	// Logic
	function tap_card($card){
		$card.toggleClass('tapped');
	}

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