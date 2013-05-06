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

	// Game message data formatting
	function gmd(data){

		// Always send user and game information
		this.user = user;
		this.game = game;

		// Body of the message
		this.body = data;
	}

	/*
	| ------------------
	|  Interface Actions
	| ------------------
	*/

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
		$('div.'+user.game_side).load('ajax/deck_cards', {deck_id : chosen_deck_id, game_side : 'mine'}, function(){
			$start_game_modal.modal('hide');

			// Calling on the draggable
			draggable_register();
		});
	});

	// Getting opponent deck's back
	socket.on('opponentDeck', function(opponent_deck_id){

		// Getting them ajaxwise
		$('div.'+user.opponent_side).load('ajax/deck_cards', {deck_id : opponent_deck_id, game_side : 'opponent'}, function(){

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
	var my_ingame_card = '.card-min.draggable.mine';



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
		$(my_ingame_card).draggable({
			'containment' : '.game-area',
			'stack' : '.card-min',
			drag : function(event, ui){

				// Getting coordinates
				var coordinates = {'card' : ui.helper.attr('card_id'), 'zindex' : ui.helper.css('z-index'),'top' : ui.position.top, 'left' : ui.position.left}

				// Sending the message
				socket.emit('draggingCard', new gmd(coordinates));
			}
		});
	}

	// Getting
	socket.on('draggingCard', function(coordinates){

		// Moving the card
		$('#card'+coordinates.card+'_opponent').css({
			'left' : coordinates.left,
			'top' : coordinates.top,
			'z-index' : coordinates.zindex
		});
	});



}