/*
| -------------------------------------------------------------------
|  Sets Informations -- magiccards.info Driver
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Version : 1.0
*/


// Harcoded object containing set informations
//		-- Subject to change
var setInfos = {

	// Early Sets
	'arabian_nights' : {
		name : 'arabian_nights',
		block : 'early_sets',
		code : 'an',
		maxCard : 92,
		label : 'Arabian Nights'
	},
	'antiquities' : {
		name : 'antiquities',
		block : 'early_sets',
		code : 'aq',
		maxCard : 100,
		label : 'Antiquities'
	},
	'legends' : {
		name : 'legends',
		block : 'early_sets',
		code : 'lg',
		maxCard : 310,
		label : 'Legends'
	},
	'the_dark' : {
		name : 'the_dark',
		block : 'early_sets',
		code : 'dk',
		maxCard : 119,
		label : 'The Dark'
	},
	'fallen_empires' : {
		name : 'fallen_empires',
		block : 'early_sets',
		code : 'fe',
		maxCard : 187,
		label : 'Fallen Empires'
	},
	'homelands' : {
		name : 'homelands',
		block : 'early_sets',
		code : 'hl',
		maxCard : 140,
		label : 'Homelands'
	},

	// Mirage Cycle
	'mirage' : {
		name : 'mirage',
		block : 'mirage',
		code : 'mr',
		maxCard : 350,
		label : 'Mirage'
	},
	'visions' : {
		name : 'visions',
		block : 'mirage',
		code : 'vi',
		maxCard : 167,
		label : 'Visions'
	},
	'weatherlight' : {
		name : 'weatherlight',
		block : 'mirage',
		code : 'wl',
		maxCard : 167,
		label : 'Weatherlight'
	},

	// Rath Cycle
	'tempest' : {
		name : 'tempest',
		block : 'rath',
		code : 'tp',
		maxCard : 350,
		label : 'Tempest'
	},
	'stronghold' : {
		name : 'stronghold',
		block : 'rath',
		code : 'sh',
		maxCard : 143,
		label : 'Stronghold'
	},
	'exodus' : {
		name : 'exodus',
		block : 'rath',
		code : 'ex',
		maxCard : 143,
		label : 'Exodus'
	},

	// Artifacts Cycle
	'urzas_saga' : {
		name : 'urzas_saga',
		block : 'artifacts',
		code : 'us',
		maxCard : 350,
		label : 'Urza\'s Saga'
	},
	'urzas_legacy' : {
		name : 'urzas_legacy',
		block : 'artifacts',
		code : 'ul',
		maxCard : 143,
		label : 'Urza\'s Legacy'
	},
	'urzas_destiny' : {
		name : 'urzas_destiny',
		block : 'artifacts',
		code : 'ud',
		maxCard : 143,
		label : 'Urza\'s Destiny'
	},

	// Masquerade Cycle
	'mercadian_masques' : {
		name : 'mercadian_masques',
		block : 'masquerade',
		code : 'mm',
		maxCard : 350,
		label : 'Mercadian Masques'
	},
	'nemesis' : {
		name : 'nemesis',
		block : 'masquerade',
		code : 'ne',
		maxCard : 143,
		label : 'Nemesis'
	},
	'prophecy' : {
		name : 'prophecy',
		block : 'masquerade',
		code : 'pr',
		maxCard : 143,
		label : 'Prophecy'
	},

	// Invasion Cycle
	'invasion' : {
		name : 'invasion',
		block : 'invasion',
		code : 'in',
		maxCard : 350,
		label : 'Invasion'
	},
	'planeshift' : {
		name : 'planeshift',
		block : 'invasion',
		code : 'ps',
		maxCard : 143,
		label : 'Planeshift'
	},
	'apocalypse' : {
		name : 'apocalypse',
		block : 'invasion',
		code : 'ap',
		maxCard : 143,
		label : 'Apocalypse'
	},

	// Odyssey Cycle
	'odyssey' : {
		name : 'odyssey',
		block : 'odyssey',
		code : 'od',
		maxCard : 350,
		label : 'Odyssey'
	},
	'torment' : {
		name : 'torment',
		block : 'odyssey',
		code : 'tr',
		maxCard : 143,
		label : 'Torment'
	},
	'judgment' : {
		name : 'judgment',
		block : 'odyssey',
		code : 'ju',
		maxCard : 143,
		label : 'Judgment'
	},

	// Onslaught Cycle
	'onslaught' : {
		name : 'onslaught',
		block : 'onslaught',
		code : 'on',
		maxCard : 350,
		label : 'Onslaught'
	},
	'legions' : {
		name : 'legions',
		block : 'onslaught',
		code : 'le',
		maxCard : 145,
		label : 'Legions'
	},
	'scourge' : {
		name : 'scourge',
		block : 'onslaught',
		code : 'sc',
		maxCard : 143,
		label : 'Scourge'
	},

	// Mirrodin Cycle
	'mirrodin' : {
		name : 'mirrodin',
		block : 'mirrodin',
		code : 'mi',
		maxCard : 306,
		label : 'Mirrodin'
	},
	'darksteel' : {
		name : 'darksteel',
		block : 'mirrodin',
		code : 'ds',
		maxCard : 165,
		label : 'Darksteel'
	},
	'fifth_dawn' : {
		name : 'fifth_dawn',
		block : 'mirrodin',
		code : '5dn',
		maxCard : 165,
		label : 'Fifth Dawn'
	},

	// Kamigawa Cycle
	'champions_of_kamigawa' : {
		name : 'champions_of_kamigawa',
		block : 'kamigawa',
		code : 'chk',
		maxCard : 306,
		label : 'Champions of Kamigawa'
	},
	'betrayers_of_kamigawa' : {
		name : 'betrayers_of_kamigawa',
		block : 'kamigawa',
		code : 'bok',
		maxCard : 165,
		label : 'Betrayers of Kamigawa'
	},
	'saviors_of_kamigawa' : {
		name : 'saviors_of_kamigawa',
		block : 'kamigawa',
		code : 'sok',
		maxCard : 165,
		label : 'Saviors of Kamigawa'
	},

	// Ravnica Cycle
	'ravnica' : {
		name : 'ravnica',
		block : 'ravnica',
		code : 'rav',
		maxCard : 306,
		label : 'Ravnica: City of Guilds'
	},
	'guildpact' : {
		name : 'guildpact',
		block : 'ravnica',
		code : 'gp',
		maxCard : 165,
		label : 'Guildpact'
	},
	'dissension' : {
		name : 'dissension',
		block : 'ravnica',
		code : 'di',
		maxCard : 180,
		label : 'Dissension'
	},

	// Ice Age Cycle
	'ice_age' : {
		name : 'ice_age',
		block : 'ice_age',
		code : 'ia',
		maxCard : 380,
		label : 'Ice Age'
	},
	'alliances' : {
		name : 'alliances',
		block : 'ice_age',
		code : 'ai',
		maxCard : 199,
		label : 'Alliances'
	},
	'coldsnap' : {
		name : 'coldsnap',
		block : 'ice_age',
		code : 'cs',
		maxCard : 155,
		label : 'Coldsnap'
	},

	// Time Spiral Cycle
	'timeshifted' : {
		name : 'timeshifted',
		block : 'timecycle',
		code : 'tsts',
		maxCard : 121,
		label : 'Time Spiral "Timeshifted"'
	},
	'time_spiral' : {
		name : 'time_spiral',
		block : 'timecycle',
		code : 'ts',
		maxCard : 301,
		label : 'Time Spiral'
	},
	'planar_chaos' : {
		name : 'planar_chaos',
		block : 'timecycle',
		code : 'pc',
		maxCard : 165,
		label : 'Planar Chaos'
	},
	'future_sight' : {
		name : 'future_sight',
		block : 'timecycle',
		code : 'fut',
		maxCard : 180,
		label : 'Future Sight'
	},

	// Lorwin Cycle
	'lorwyn' : {
		name : 'lorwyn',
		block : 'lorwyn',
		code : 'lw',
		maxCard : 301,
		label : 'Lorwyn'
	},
	'morningtide' : {
		name : 'morningtide',
		block : 'lorwyn',
		code : 'mt',
		maxCard : 150,
		label : 'Morningtide'
	},


	// Shadowmoor Cycle
	'shadowmoor' : {
		name : 'shadowmoor',
		block : 'shadowmoor',
		code : 'shm',
		maxCard : 301,
		label : 'Shadowmoor'
	},
	'eventide' : {
		name : 'eventide',
		block : 'shadowmoor',
		code : 'eve',
		maxCard : 180,
		label : 'Eventide'
	},

	// Shards of Alara
	'shards_of_alara' : {
		name : 'shards_of_alara',
		block : 'shards_of_alara',
		code : 'ala',
		maxCard : 249,
		label : 'Shards of Alara'
	},
	'conflux' : {
		name : 'conflux',
		block : 'shards_of_alara',
		code : 'cfx',
		maxCard : 145,
		label : 'Conflux'
	},
	'alara_reborn' : {
		name : 'alara_reborn',
		block : 'shards_of_alara',
		code : 'arb',
		maxCard : 145,
		label : 'Alara Reborn'
	},

	// Zendikar Cycle
	'zendikar' : {
		name : 'zendikar',
		block : 'zendikar',
		code : 'zen',
		maxCard : 269,
		label : 'Zendikar'
	},
	'worldwake' : {
		name : 'worldwake',
		block : 'zendikar',
		code : 'wwk',
		maxCard : 145,
		label : 'Worldwake'
	},
	'rise_of_the_eldrazi' : {
		name : 'rise_of_the_eldrazi',
		block : 'zendikar',
		code : 'roe',
		maxCard : 248,
		label : 'Rise of the Eldrazi'
	},

	// Scars of Mirrodin
	'scars_of_mirrodin' : {
		name : 'scars_of_mirrodin',
		block : 'scars_of_mirrodin',
		code : 'som',
		maxCard : 249,
		label : 'Scars of Mirrodin'
	},
	'mirrodin_besieged' : {
		name : 'mirrodin_besieged',
		block : 'scars_of_mirrodin',
		code : 'mbs',
		maxCard : 155,
		label : 'Mirrodin Besieged'
	},
	'new_phyrexia' : {
		name : 'new_phyrexia',
		block : 'scars_of_mirrodin',
		code : 'nph',
		maxCard : 175,
		label : 'New Phyrexia'
	},

	// Innistrad cycle
	'innistrad' : {
		name : 'innistrad',
		block : 'innistrad',
		code : 'isd',
		maxCard : 264,
		label : 'Innistrad'
	},
	'dark_ascension' : {
		name : 'dark_ascension',
		block : 'innistrad',
		code : 'dka',
		maxCard : 158,
		label : 'Dark Ascension'
	},
	'avacyn_restored' : {
		name : 'avacyn_restored',
		block : 'innistrad',
		code : 'avr',
		maxCard : 244,
		label : 'Avacyn Restored'
	},

	// Return to Ravnica
	'return_to_ravnica' : {
		name : 'return_to_ravnica',
		block : 'return_to_ravnica',
		code : 'rtr',
		maxCard : 275,
		label : 'Return to Ravnica'
	},
	'gatecrash' : {
		name : 'gatecrash',
		block : 'return_to_ravnica',
		code : 'gtc',
		maxCard : 249,
		label : 'Gatecrash'
	},
	'dragons_maze' : {
		name : 'dragons_maze',
		block : 'return_to_ravnica',
		code : 'dgm',
		maxCard : 156,
		label : 'Dragon\'s Maze'
	},

	// Core Sets
	'alpha' : {
		name : 'alpha',
		block : 'core',
		code : 'al',
		maxCard : 295,
		label : 'Limited Edition Alpha'
	},
	'limited_edition_beta' : {
		name : 'limited_edition_beta',
		block : 'core_sets',
		code : 'be',
		maxCard : 302,
		label : 'Limited Edition Beta'
	},
	'unlimited_edition' : {
		name : 'unlimited_edition',
		block : 'core_sets',
		code : 'un',
		maxCard : 302,
		label : 'Unlimited Edition'
	},
	'revised-edition' : {
		name : 'revised_edition',
		block : 'core_sets',
		code : 'rv',
		maxCard : 306,
		label : 'Revised Edition'
	},
	'fourth_edition' : {
		name : 'fourth_edition',
		block : 'core_sets',
		code : '4e',
		maxCard : 378,
		label : 'Fourth Edition'
	},
	'fifth_edition' : {
		name : 'fifth_edition',
		block : 'core_sets',
		code : '5e',
		maxCard : 449,
		label : 'Fifth Edition'
	},
	'classic_sixth_edition' : {
		name : 'classic_sixth_edition',
		block : 'core_sets',
		code : '6e',
		maxCard : 350,
		label : 'Classic Sixth Edition'
	},
	'seventh_edition' : {
		name : 'seventh_edition',
		block : 'core_sets',
		code : '7e',
		maxCard : 350,
		label : 'Seventh Edition'
	},
	'eighth_edition' : {
		name : 'eighth_edition',
		block : 'core_sets',
		code : '8e',
		maxCard : 350,
		label : 'Eighth Edition'
	},
	'ninth_edition' : {
		name : 'ninth_edition',
		block : 'core_sets',
		code : '98',
		maxCard : 350,
		label : 'Ninth Edition'
	},
	'tenth_edition' : {
		name : 'tenth_edition',
		block : 'core_sets',
		code : '10e',
		maxCard : 383,
		label : 'Tenth Edition'
	},
	'magic_2010' : {
		name : 'magic_2010',
		block : 'core_sets',
		code : 'm10',
		maxCard : 249,
		label : 'Magic 2010'
	},
	'magic_2011' : {
		name : 'magic2011',
		block : 'core_sets',
		code : 'm11',
		maxCard : 249,
		label : 'Magic 2011'
	},
	'magic_2012' : {
		name : 'magic_2012',
		block : 'core_sets',
		code : 'm12',
		maxCard : 249,
		label : 'Magic 2012'
	},
	'magic_2013' : {
		name : 'magic_2013',
		block : 'core_sets',
		code : 'm13',
		maxCard : 249,
		label : 'Magic 2013'
	}

};


module.exports = setInfos;