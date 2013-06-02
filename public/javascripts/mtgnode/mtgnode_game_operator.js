/*
| -------------------------------------------------------------------
|  MTGNode Game Operator
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
|
| Dependancies :
|     * Class Messager
|     * Class Deck
|     * Class Hand
|     * Class Game
*/

function MTGNodeGameOperator(socket, room, user){

	/*
	| ------------------
	|  Configuration
	| ------------------
	*/

	// Object Operation
	//-------------------
	var operator = this;

	this.socket = socket;
	this.room = room;
	this.user = user;

	this.drag_grid = [10, 10];


	// Interface Variables
	//--------------------
	var $update_life = $(".update-life.mine");
	var $starting_player = $("#starting_player");
	var $card_viewer = $('#card_viewer_widget');
	var $game_area = $('.game-area');
	var $game_zone = $('.game-emplacement');
	var $helper_block = $('#helper_block');

	var $my_life_counter = $(".life-counter.mine");
	var $my_message_receiver = $(".message-receiver.mine");
	var $my_turn_indicator = $(".turn-indicator.mine");

	var $opponent_life_counter = $(".life-counter.opponent");
	var $opponent_message_receiver = $(".message-receiver.opponent");
	var $opponent_turn_indicator = $(".turn-indicator.opponent");


	// Globals Values
	//-------------------
	var my_class = '.mine';
	var opponent_class = '.opponent';
	var card_to_see = '.card-min';
	var card_back_src = $("#CARDBACK").val();


	// Messager & Helper
	//-------------------
	var MESSAGER = new Messager(socket, room);
	var HELPER = new Helper({card_back_src : card_back_src});


	// Registering Decks
	//-------------------
	var my_deck_config = {
		count : $('.in-deck'+my_class).length,
		area : '.deck-emplacement'+my_class,
		cards : '.card-min.in-deck'+my_class,
		helper : HELPER,
		counter : false
	};

	var opponent_deck_config = {
		count : $('.in-deck'+opponent_class).length,
		area : '.deck-emplacement'+opponent_class,
		cards : '.card-min.in-deck'+opponent_class,
		helper : HELPER,
		counter : false
	};

	var MY_DECK = new Deck(my_deck_config);
	var OP_DECK = new Deck(opponent_deck_config);


	// Registering Games
	//-------------------
	var my_game_config = {
		area : '.game-emplacement'+my_class,
		cards : '.card-min.in-game'+my_class
	};

	var opponent_game_config = {
		area : '.game-emplacement'+opponent_class,
		cards : '.card-min.in-game'+opponent_class
	};

	var MY_GAME = new Game(my_game_config);
	var OP_GAME = new Game(opponent_game_config);


	// Registering Hands
	//-------------------
	var my_hand_config = {
		area : '.hand-emplacement'+my_class,
		cards : '.card-min.in-hand'+my_class,
		helper : HELPER,
		counter : false
	};

	var opponent_hand_config = {
		area : '.hand-emplacement'+opponent_class,
		cards : '.card-min.in-hand'+opponent_class,
		helper : HELPER,
		counter : false
	};

	var MY_HAND = new Hand(my_hand_config);
	var OP_HAND = new Hand(opponent_hand_config);



	/*
	| -------------------------
	|  Starters
	| -------------------------
	*/

	// Deck Shuffling
	var shuffle = MY_DECK.shuffleFromClient();
	MESSAGER.send('shufflingDeck', shuffle);


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
		HELPER.notify($my_message_receiver, 'You start');

		// Indicator
		$my_turn_indicator.addClass('btn-success my-turn');
		$opponent_turn_indicator.addClass('btn-danger');
	}
	else{

		// Message
		HELPER.notify($opponent_message_receiver, 'Your opponent starts', 'error');

		// Indicator
		$my_turn_indicator.addClass('btn-danger');
		$opponent_turn_indicator.addClass('btn-success my-turn');
	}


	/*
	| -------------------------
	|  From Client Interactions
	| -------------------------
	*/

	// Drawing a Card
	//----------------

	// Action
	$game_area.on('click', MY_DECK.cards, function(e){

		// Getting first card of DOM
		// WARNING :: Get the last DOM card otherwise because of z-index rule
		var $card = $(MY_DECK.cards).eq(0);

		// Using Logic
		MY_DECK.to_hand($card, MY_HAND);

		// Make the card draggable
		//register_draggable($card);

		// Revealing card for me only
		HELPER.reveal_card($card);

		// Alerting server
		MESSAGER.send('drawingCard', $card.attr('card_id'));

	});

	/*

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

*/

	/*
	| -------------------------
	|  From Server Interactions
	| -------------------------
	*/

	socket.on(MESSAGER.generic_message, function(data){

		// Switch on message kind
		switch(data.head){

			// Shuffling Deck
			case 'shufflingDeck' :
				OP_DECK.shuffleFromServer(data.body);
				break;

			// Drawing a Card
			case 'drawingCard' :
				OP_DECK.to_hand(HELPER.opponent_card(data.body), OP_HAND);
				break;



			/*

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

		*/

			default:
				break;
		}
	});


}