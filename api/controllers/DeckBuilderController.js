/*
| -------------------------------------------------------------------
|  MTGNode Deck Builder Controller
| -------------------------------------------------------------------
|
|
|	Author : Yomguithereal
|	Version : 1.0
*/
var SetModel = require('../models/SetModel');

// Index
exports.builder = function(req, res){

	// Rendering the view
	res.view('deck-builder/deck-builder', {sets: SetModel.getSetInfos()});
}

// Get all cards from a Set
exports.set_cards = function(req, res){

	// Sending back the cards
	res.json(SetModel.getCards(req.param('set')));
}