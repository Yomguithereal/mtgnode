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
		container : '.card-container'+my_class,
		count : $('.in-deck'+my_class).length,
		area : '.deck-emplacement'+my_class,
		cards : '.card-min.in-deck'+my_class,
		helper : HELPER,
		counter : false
	};

	var opponent_deck_config = {
		container : '.card-container'+opponent_class,
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


	// Registering Graveyards
	//-----------------------
	var my_graveyard_config = {
		area : '.cemetery-emplacement'+my_class,
		cards : '.card-min.in-cemetery'+my_class,
		helper : HELPER,
		counter : false
	};

	var opponent_graveyard_config = {
		area : '.cemetery-emplacement'+opponent_class,
		cards : '.card-min.in-cemetery'+opponent_class,
		helper : HELPER,
		counter : false
	};

	var MY_GRAVE = new Graveyard(my_graveyard_config);
	var OP_GRAVE = new Graveyard(opponent_graveyard_config);



	/*
	| -------------------------
	|  Starters
	| -------------------------
	*/

	// Deck Shuffling
	var shuffle = MY_DECK.shuffleFromClient();
	MESSAGER.send('shufflingDeck', shuffle);


	// Card Viewer Widget
	$(MY_DECK.container+', '+OP_DECK.container).on('mouseover', card_to_see, function(e){
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
	$(MY_DECK.container).on('click', MY_DECK.cards, function(e){

		// Getting first card of DOM
		// WARNING :: Get the last DOM card otherwise because of z-index rule
		var $card = $(MY_DECK.cards).eq(0);

		// Using Logic
		MY_DECK.to_hand($card, MY_HAND);

		// Make the card draggable
		register_draggable($card);

		// Revealing card for me only
		HELPER.reveal_card($card);

		// Alerting server
		MESSAGER.send('drawingCard', $card.attr('card_id'));

	});


	// Dragging Cards
	//------------------

	function register_draggable($card){

		// Draggable
		$card.draggable({
			containment : '.game-area',
			snap : '.hand-emplacement.mine, game-emplacement.mine, cemetery-emplacement.mine',
			grid : operator.drag_grid,
			drag : function(event, ui){

				// Card
				var $card = $(ui.helper);

				// Updating z-index
				HELPER.update_zindex($card);

				// If mine
				var pos = {
					left : ui.position.left,
					top : ui.position.top,
					zindex : $card.css('z-index')
				}
				if($card.hasClass('mine')){
					MESSAGER.send('draggingCard', {position : pos, card : $card.attr('card_id')});
				}
			}
		});

		$card.draggable('enable');
	}


	// Droping Cards
	//------------------

	// In Game
	$game_zone.droppable({
		drop : function(event, ui){

			// When a card enter the game zone, we acknowledge its ingame nature
			var $card = $(ui.draggable);
			MY_HAND.to_game($card, MY_GAME);

			// Sending message to server
			MESSAGER.send('playingCard', $card.attr('card_id'));

		}
	});

	// In Hand
	$(MY_HAND.area).droppable({
		tolerance : "fit",
		drop : function(event, ui){

			var $card = $(ui.draggable);

			// If card is already in hand, we cancel the event
			if($card.hasClass('in-hand')){
				MY_HAND.reorganize();

				// Sending message to server
				MESSAGER.send('reorganizingHand');
				return false;
			}

			// If card comes from game
			if($card.hasClass('in-game')){

				MY_GAME.to_hand($card, MY_HAND);

				// Sending message to server
				MESSAGER.send('backingCard', $card.attr('card_id'));
			}

		}
	});

	// In Deck
	$(MY_DECK.area).droppable({
		drop : function(event, ui){

			var $card = $(ui.draggable);

			if($card.hasClass('in-hand')){
				MY_HAND.to_deck($card, MY_DECK);
				MESSAGER.send('deckingCardFromHand', $card.attr('card_id'));
			}
			else if($card.hasClass('in-game')){
				MY_GAME.to_deck($card, MY_DECK);
				MESSAGER.send('deckingCardFromGame', $card.attr('card_id'));
			}

		}
	});

	// In Graveyard
	$(MY_GRAVE.area).droppable({
		drop : function(event, ui){

			var $card = $(ui.draggable);

			if($card.hasClass('in-hand')){
				MY_HAND.to_graveyard($card, MY_GRAVE);
				MESSAGER.send('discardingCard', $card.attr('card_id'));
			}
			else if($card.hasClass('in-game')){
				MY_GAME.to_graveyard($card, MY_GRAVE);
				MESSAGER.send('buryingCard', $card.attr('card_id'));
			}

		}
	});



	// Tapping Cards
	//------------------

	$(MY_DECK.container).on('click', MY_GAME.cards, function(e){
		var $card = $(this);
		e.preventDefault();

		// Tapping Card
		MY_GAME.tap($card);

		// Sending information to server
		MESSAGER.send('tappingCard', $card.attr('card_id'));

		return false;
	});


	// Batch Untapping
	//------------------

	$.contextMenu({
		selector: MY_GAME.area,
		zIndex : 100000,
		callback: function(key, options) {

			switch(key){

				case 'untapAll' :

					// Do not activate if there is no tapped card
					if($(MY_GAME.cards+'.tapped').length == 0){ break; }

					MY_GAME.batch_untap();

					// Sending information to server
					MESSAGER.send('batchUntapping');
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

	$.contextMenu({
		selector: MY_DECK.cards,
		zIndex : 100001,
		callback: function(key, options) {

			switch(key){

				case 'drawFullHand' :
					MY_DECK.draw_full_hand();

					// Sending information to server
					MESSAGER.send('drawingFullHand');
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
		MESSAGER.send('updatingLife', type);
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

			MESSAGER.send('finishingTurn');
		}
	});



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

			// Dragging a Card
			case 'draggingCard' :
				var $card = HELPER.opponent_card(data.body.card);

				$card.css({
					'left' : data.body.position.left,
					'top' : data.body.position.top,
					'z-index' : data.body.position.zindex
				});

				break;

			// Playing a Card
			case 'playingCard' :
				var $card = HELPER.opponent_card(data.body);

				OP_HAND.to_game($card, OP_GAME);
				HELPER.reveal_card($card);
				break;

			// Opponent Reorganize its hand
			case 'reorganizingHand' :
				OP_HAND.reorganize();
				break;

			// Backing a Card
			case 'backingCard' :
				var $card = HELPER.opponent_card(data.body);

				OP_GAME.to_hand($card, OP_HAND);
				HELPER.conceal_card($card);
				break;

			// Tapping a Card
			case 'tappingCard' :
				OP_GAME.tap(HELPER.opponent_card(data.body));
				break;

			// Decking a Card From Hand
			case 'deckingCardFromHand' :
				OP_GAME.to_deck(HELPER.opponent_card(data.body), OP_DECK);
				break;

			// Decking a Card From Game
			case 'deckingCardFromGame' :
				OP_HAND.to_deck(HELPER.opponent_card(data.body), OP_DECK);
				break;

			// Discarding a Card
			case 'discardingCard' :
				OP_GAME.to_graveyard(HELPER.opponent_card(data.body), OP_GRAVE);
				break;

			// Burying a Card
			case 'buryingCard' :
				OP_HAND.to_graveyard(HELPER.opponent_card(data.body), OP_GRAVE);
				break;

			// Batch Untapping
			case 'batchUntapping' :
				OP_GAME.batch_untap();
				break;

			// Draw Full Hand
			case 'drawFullHand' :
				OP_DECK.draw_full_hand();
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