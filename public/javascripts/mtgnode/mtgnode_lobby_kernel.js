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

	// Helpers
	//-------------
	function uniqid(){
		return (new Date().getTime()).toString(16);
	}

	// Variables
	//-------------

	// Selectors
	var $game_list = $('#game_list');
	var $host_game = $('#host_game');

	// Variables
	var user_id = $('#USER_ID').val();
	var username = $('#USERNAME').val();


	// Retrieve Games
	//---------------
	socket.on('retrieveGames', function(data){

		// Iterates through the list
		console.log(data.games);
		for(var i = 0; i < data.games.length; i++){
			$game_list.append('<li><a href="/game?'+data.games[i]+'">'+data.games[i]+'</a></li>');
		}
	});

	// Create Game
	//------------

	// Client
	$host_game.click(function(){
		var name = $('#host_game_name').val()+"#"+uniqid();
		name = encodeURIComponent(name);

		// Enforcing game name
		if($.trim(name) == ''){
			return false;
		}

		// To socket
		socket.emit('newGame', {name : name});

		// Joining the room
		location.href = '/game?'+name;
	});

	// Server
	socket.on('newGame', function(name){

		// Adding an entry
		$game_list.append('<li><a href="/game?'+name+'">'+name+'</a></li>');
	});



}