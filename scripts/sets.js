// Creating a minimized set info file

// Loading sets
var fs = require('fs'),
    sets = require('../database/mtg.json');

// Main Loop
for (var set in sets) {
	sets[set]['nb_cards'] = sets[set].cards.length
	delete sets[set].cards;
}

// Writing in file
fs.writeFileSync('./database/sets.json', JSON.stringify(sets));
