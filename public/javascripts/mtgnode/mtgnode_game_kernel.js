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