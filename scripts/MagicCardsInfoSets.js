// Creating a template for magiccards.info set info.
// Loading sets
var fs = require('fs');
var sets = require('../db/AllSets.json');

// Main Loop
for(var set in sets){
	sets[set] = sets[set].name;
}

// Writing in file
fs.writeFileSync('./db/magiccardsinfo_template.json', JSON.stringify(sets));