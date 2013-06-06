/*
| -------------------------------------------------------------------
|  MTGNode Game Graveyard Abstraction
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
|
*/

function Graveyard(config){

	// Properties
	//-------------------
	var self = this;

	// Model
	this.count = 0;

	// DOM
	this.area = config.area;
	this.left = $(this.area).position().left;
	this.width = $(this.area).width();
	this.cards = config.cards;
	this.counter = config.counter;
	this.helper = config.helper;

}
