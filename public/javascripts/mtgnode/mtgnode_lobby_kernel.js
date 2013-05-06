/*
| -------------------------------------------------------------------
|  MTGNode Lobby Kernel
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
*/


function MTGNodeLobbyKernel(){

	var self = this;
	var socket = io.connect('/lobby');

	/*
	| ------------------
	|  Lobby Actions
	| ------------------
	*/

	// Variables
	//-------------

	// Selectors
	var $game_list = $('#game_list');
	var $host_game = $('#host_game');

	// Variables
	var user_id = $('#USER_ID').val();
	var username = $('#USERNAME').val();

	// Connection
	//---------------
	socket.emit('registerPlayer', {user_id : user_id, username : username});


	// Retrieve Games
	//---------------
	socket.on('retrieveGames', function(games){

		// Iterates through the list
		for(var key in games){
			var game = games[key];
			$game_list.append('<li><a href="/game?'+game.name+'||'+game.host+'">'+game.name+' (Host : '+game.host+')</a></li>');
		}
	});

	// Create Game
	//------------

	// Client
	$host_game.click(function(){
		var name = $('#host_game_name').val();

		// Enforcing game name
		if($.trim(name) == ''){
			return false;
		}

		// To socket
		socket.emit('newGame',{name : name, host : user_id});
		location.href = '/game?'+name+'||'+user_id
	});

	// Server
	socket.on('newGame', function(game){

		// Adding an entry
		$game_list.append('<li><a href="/game?'+game.name+'||'+game.host+'">'+game.name+' (Host : '+game.host+')</a></li>');
	});



}