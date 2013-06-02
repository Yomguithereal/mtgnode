/*
| -------------------------------------------------------------------
|  MTGNode Game Message Abstraction
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
*/

function Messager(socket, room){

	// Properties
	//-------------------

	// Socket to interact with server
	this.socket = socket;

	// Room to notify
	this.room = room;

	// Message Saving
	this.last_message = false;

	// Configuration
	this.generic_message = 'gameUpdate';

	// Methods
	//-------------------
	this.send = function(head, data){
		data = data || false;

		// Preparing message
		var message = {
			head : head,
			room : this.room,
			body : data
		};

		// Emitting to server
		this.socket.emit(this.generic_message, message);

		// Conserving last message
		this.last_message = message;
	}

}
