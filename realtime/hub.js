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
	var rooms = [];


	// Lobby Events
	//-------------
	io.of('/lobby').on('connection', function(socket){

		// Connection
		var games = io.sockets.manager.rooms;
		var games_for_client = [];
		for(var game in games){
			if((game != "") && (game != "/lobby") &&(game != "/game")){
				games_for_client.push(game.replace('/game/', ''));
			}
		}
		socket.emit('retrieveGames', {games : games_for_client});

		// New Game
		socket.on('newGame', function(data){
			io.of('/lobby').emit('newGame', data.name);
		});

	});

	// Game Events
	//-------------
	io.of('/game').on('connection', function(socket){


		// Player registration
		socket.on('registerPlayer', function(data){

			// We register the user to the correct room
			socket.join(data.room);

			// We check the number of player in the room
			var players = io.of('/game').clients(data.room);

			// If game is full, we kick the player
			if(players.length == 3){
				socket.leave(data.room);
				socket.emit('kickPlayer');
				return false;
			}

			// We check whether the player is 1 or 2
			if(players.length == 1){
				var game_side = 'player1';
				socket.emit('gameSide', game_side);
			}
			else if(players.length == 2){

				// Game is now ready to start, we notify the client
				var game_side = 'player2';
				socket.emit('gameSide', game_side);


				// Determining who is going to start
				var starting_player_number = Math.floor(Math.random() * 2) + 1;

				io.of('/game').in(data.room).emit('chooseDeck', starting_player_number);

			}


		});

		socket.on('debugGame', function(){
			var starting_player_number = Math.floor(Math.random() * 2) + 1;
			socket.emit('chooseDeck', starting_player_number);
		});

		// Sending chosen deck to opponent
		socket.on('chosenDeck', function(data){
			socket.broadcast.to(data.room).emit('opponentDeck', data.body);
		});

		///////////////////////
		// INTERFACE ACTIONS //
		///////////////////////

		// Generic Message Receiver
		socket.on('gameUpdate', function(data){
			socket.broadcast.to(data.room).emit('gameUpdate', data);
		});



	});

}

module.exports = IoHub;