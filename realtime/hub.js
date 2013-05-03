/*
| -------------------------------------------------------------------
|  Socket Io Event Hub
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Version : 1.0
*/

function IoHub(port_to_listen){

	var self = this;
	var io = require('socket.io').listen(port_to_listen);

	// Variables
	//-------------
	var players = [];

	// Events
	//-------------
	io.sockets.on('connection', function(socket){

		// Registering the player
		if(players.length == 0){
			players.push({'id' : 'player1', 'socket' : socket})
			socket.emit('playerId', 'player1');
		}
		else if(players.length ==1){
			players.push({'id' : 'player2', 'socket' : socket})
			socket.emit('playerId', 'player2');
		}
		else{
			socket.emit('kickPlayer');
		}


		// Dragging a card
		socket.on('draggingCard', function(coordinates){
			socket.broadcast.emit('draggingCard', coordinates);
		});

		// Tapping a card
		socket.on('tappingCard', function(card){
			socket.broadcast.emit('tappingCard', card);
		});

		// Flipping a card
		socket.on('flippingCard', function(card){
			socket.broadcast.emit('flippingCard', card);
		});
	});

}

module.exports = IoHub;