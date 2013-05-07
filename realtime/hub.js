/*
| -------------------------------------------------------------------
|  Socket Io Event Hub
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Version : 1.0
*/

// Dependancies
var Game = require('../model/classes/game.js');

function IoHub(port_to_listen){

	var self = this;
	var io = require('socket.io').listen(port_to_listen);

	// Variables
	var games = {};

	// Helpers
	function opponent_socket(data){

		// Getting current game
		var cg = games[data.game.name];

		// Determining opponent socket
		if(data.user.game_side == 'player1'){
			return cg.player2.socket;
		}
		else{
			return cg.player1.socket;
		}
	}


	// Lobby Events
	//-------------
	io.of('/lobby').on('connection', function(socket){

		// Connection
		var games_clients = {};
		for(var key in games){
			games_clients[key] = games[key].gameForClient();
		}
		socket.emit('retrieveGames', games_clients);

		// New Game
		socket.on('newGame', function(data){
			var new_game = new Game(data.name, data.host)
			games[data.name] = new_game;
			socket.broadcast.emit('newGame', new_game);
		});


	});

	// Game Events
	//-------------
	io.of('/game').on('connection', function(socket){


		// Player registration
		socket.on('registerPlayer', function(data){

			// Check if game exists
			if(games[data.game.name]){

				// Check if game is full
				if(games[data.game.name].isFull){
					console.log('Game Full');
					socket.emit('kickPlayer');
					return false;
				}

				// Send back player info
				if(data.user.id == games[data.game.name].host){
					var game_side = 'player1';
					games[data.game.name].player1.socket = socket;
				}
				else{
					var game_side = 'player2';
					games[data.game.name].isFull = true;
					games[data.game.name].player2.socket = socket;

					// On annonce que les deux joueurs sont présents
					games[data.game.name].player1.socket.emit('chooseDeck');
					games[data.game.name].player2.socket.emit('chooseDeck');
				}

				socket.emit('gameSide', game_side);
			}
			else{
				console.log('Inexistant Game');
				socket.emit('kickPlayer');
			}
		});

		// Sending chosen deck to opponent
		socket.on('chosenDeck', function(data){
			opponent_socket(data).emit('opponentDeck', data.body);
		});

		///////////////////////
		// INTERFACE ACTIONS //
		///////////////////////

		// Updating life
		socket.on('updatingLife', function(data){
			opponent_socket(data).emit('updatingLife', data.body);
		});

		//////////////////
		// CARD ACTIONS //
		//////////////////

		// Dragging Cards
		socket.on('draggingCard', function(data){
			opponent_socket(data).emit('draggingCard', data.body);
		});

		// Drawing Cards
		socket.on('drawingCard', function(data){
			opponent_socket(data).emit('drawingCard', data.body);
		});

		// Revealing Cards
		socket.on('revealingCard', function(data){
			opponent_socket(data).emit('revealingCard', data.body);
		});

		// Concealing Cards
		socket.on('concealingCard', function(data){
			opponent_socket(data).emit('concealingCard', data.body);
		});

		// Tapping Cards
		socket.on('tappingCard', function(data){
			opponent_socket(data).emit('tappingCard', data.body);
		});


	});

}

module.exports = IoHub;