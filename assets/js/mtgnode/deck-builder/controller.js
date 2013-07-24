/*
| -------------------------------------------------------------------
|  MTGNode DeckBuilder Domino Controller
| -------------------------------------------------------------------
|
|
|	Author : Yomguithereal
|	Version : 1.0
*/

;(function($, w, undefined){
	"use strict";

	// Domino Settings
	domino.settings({
		verbose: true,
		displayTime: true,
		mergeRequests: false
	});

	// Calling upon domino
	var controller = new domino({
		name: 'DeckBuilder',
		properties: [

			// Left Panel
			{
				id: 'viewedCards',
				value: [],
				label: 'Card viewed in the left panel.',
				type: 'array',
				dispatch: 'viewedCardsUpdated'
			}
		]
		,services: [
			{
				id: 'getSetCards',
				setter: 'viewedCards',
				url: 'ajax/deck-builder/set?code=:set'
			}
		]
		,hacks: [
			{
				triggers: 'setSelected',
				method: function(event){
					this.request('getSetCards', {
						shortcuts: {
							set: event.data
						}
					});
				}
			}
		]
	});


	// Card Display Module
	function CardDisplay(){
		domino.module.call(this);

		// Variables
		var self = this;
		var $set_select = $("#set_select");

		// Emettor
		//------------
		$set_select.change(function(){

			// Getting card with ajax
			self.dispatchEvent('setSelected', $(this).val());
		});

		// Receptor
		//----------
		this.triggers.events['viewedCardsUpdated'] = function(d){
			console.log(d.get('viewedCards'));
		}
		
	}

	// Instanciating Modules
	var cardDisplay = controller.addModule(CardDisplay);


})(jQuery, window);