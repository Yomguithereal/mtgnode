/*
| -------------------------------------------------------------------
|  Sets Model -- magiccards.info Driver
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Version : 1.0
*/

// Dependancies
var Card = require('./classes/card.js');
var cheerio = require('cheerio');
var request = require('request');

// Object
function SetModel(){

	var self = this;

	// Loading config file
	var setInfos = require('./config/setinfo.js');

	// Get the sets informations
	this.getSetsList = function(){
		return setInfos;
	}

	// Get all the cards src of a set
	this.getSetCards = function(set){

		var cards = [];
		for(i=1; i <= setInfos[set].maxCard; i++){

			// Setting a new card
			var card = new Card(setInfos[set].code, i);
			cards.push(card);
		}

		// Getting the cards back
		return cards;
	}

	// Search specific cards
	this.getSpecificCards = function(query, callback){

		// Setting the url options
		var options = {
			host : "http://www.magiccards.info",
			path : '/query?v=list&s=cname&q='+encodeURIComponent(query),
		};

		// Getting html
		request(options.host+options.path, function(error, response, body){

			// Parsing the html to get the cards
			var $ = cheerio.load(body);
			var cards = [];
			var url_re = /en\/([^\/]+)\/([^.]+).jpg/;
			var edition_re = /^\/([^\/]+)\//;

			// If Only one card
			if($('.legal').length > 0){
				var url = $('[src$=".jpg"]').attr('src');
				var search = url_re.exec(url);
				cards.push(new Card(search[1], search[2]));
			}
			else{

				// If Several Cards
				$('tr.even, tr.odd').each(function(){
					var card = new Card(
						edition_re.exec($(this).find('a').attr("href"))[1],
						$(this).children('td').eq(0).text()
					);
					cards.push(card);
				});
			}

			// Firing callback
			callback(cards);
		});

	}


}

module.exports = new SetModel();