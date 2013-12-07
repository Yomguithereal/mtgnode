// Creating a slightly different json file for cards.

// Loading sets
var _ = require('lodash'),
    fs = require('fs'),
    sets = require('../db/AllSets.json'),
    numbers = require('../db/Numbers.json');

// Main Loop
var cards_array = [];
var missing_set_numbers = [];
for(var set in sets){

  // Looping through cards
  sets[set].cards.forEach(function(card, index){
    card['set'] = set;

    // Registering missing set
    if(!~missing_set_numbers.indexOf(set) && card.number === undefined) {
      missing_set_numbers.push(set);
    }

    // Indicating card number if missing
    // TODO: refine for several identical cards such as lands
    if (card.number === undefined) {
      if(!~numbers[set].indexOf(card.name))
        console.log(card.name, card.set);

      card.number = numbers[set].indexOf(card.name);
    }

    cards_array.push(card);
  });
}

// Debug
console.log(missing_set_numbers);

// Writing in file
cards_array.reverse();
fs.writeFileSync('./db/AllCards.json', JSON.stringify(cards_array));
