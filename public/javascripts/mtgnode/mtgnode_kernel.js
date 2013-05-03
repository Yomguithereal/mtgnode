/*
| -------------------------------------------------------------------
|  MTGNode Client Kernel
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
*/


function MTGNodeKernel(){

	var self = this;
	socket = io.connect();
	PID = '';

	/*
	| ---------------
	|  Player Actions
	| ---------------
	*/

	// If more than two players
	socket.on('kickPlayer', function(){
		location.href = '/kicked';
	});

	// Handshake
	socket.on('playerId', function(id){

		// Initializing player id
		PID = id;
	});

	/*
	| -------------
	|  Card Actions
	| -------------
	*/

	// Message list
	//		draggingCard (coordinates : card, top, left)
	//		flippingCard (card)


	// Variables
	//-------------
	var $ingame_card = $('.card-min');
	var flipped_card_image = '/images/card-back.jpeg'
	var card_image_url = 'http://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=';
	var $card_viewer = $('#card_viewer_widget');


	// Card Viewer Widget
	//-------------------
	$ingame_card.mouseover(function(){
		var src_to_see = $(this).attr('src');
		$card_viewer.attr('src', src_to_see);
	});


	// Dragging a Card
	//----------------

	// Sending
	$ingame_card.draggable({
		'containment' : '.game-area',
		'stack' : '.card-min',
		drag : function(event, ui){

			// Getting coordinates
			var coordinates = {'card' : ui.helper.attr('card_id'), 'top' : ui.position.top, 'left' : ui.position.left}

			// Sending the message
			socket.emit('draggingCard', coordinates);
		}
	});

	// Getting
	socket.on('draggingCard', function(coordinates){
		var $card = $('[card_id='+coordinates.card+']');
		$card.css({
			'left' : coordinates.left,
			'top' : coordinates.top
		});
	});


	// Tapping a Card
	//---------------

	// Logic
	function tapCard(card_id){
		var $card = $('[card_id='+card_id+']');

		if($card.hasClass('tapped')){
			$card.removeClass('tapped');
		}
		else{
			$card.addClass('tapped');
		}
	}

	// Sending
	$ingame_card.bind('contextmenu', function(e){

		e.preventDefault();

		var card = $(this).attr('card_id');
		tapCard(card);
		socket.emit('tappingCard', card);

		return false;
	});

	// Getting
	socket.on('tappingCard', function(card){
		tapCard(card);
	});

	// Flip a Card
	//------------

	// Logic
	function flipCard(card_id){
		var $card = $('[card_id='+card_id+']');

		if($card.hasClass('flipped')){
			$card.attr('src', card_image_url+card_id);
			$card.removeClass('flipped');
		}
		else{
			$card.attr('src', flipped_card_image);
			$card.addClass('flipped');
		}
	}

	// Sending
	$ingame_card.dblclick(function(){
		var card = $(this).attr('card_id');
		flipCard(card);
		socket.emit('flippingCard', card);
	});

	// Getting
	socket.on('flippingCard', function(card){
		flipCard(card);
	});



}