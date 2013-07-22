// Creating a slightly different json file for cards.

// Loading sets
var fs = require('fs');
var sets = require('../db/AllSets.json');

// Main Loop
var cards_array = [];
for(var set in sets){

	// Looping through cards
	sets[set].cards.forEach(function(card, index){
		card['set'] = set;
		cards_array.push(card);
	});
}

// Writing in file
fs.writeFileSync('./db/AllCards.json', JSON.stringify(cards_array));