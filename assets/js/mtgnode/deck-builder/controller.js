// Deckbuilder Domino Controller
;(function($, w, undefined){
	"use strict";

	// Calling upon domino
	var controller = new domino({
		properties: [

			// Deck Selection
			{
				id: 'viewedCards',
				type: 'array',
				dispatch: 'viewedCardsUpdated',
				trigger: 'viewCards'
			}
		]
		,services: [
			{
				id: 'getViewedCards',
				setter: 'viewCards',
				url: 'ajax/deck-builder/set'
			}
		]
	});


	// Card Display Module
	function CardDisplay(){
		domino.module.call(this);
	}


})(jQuery, window);