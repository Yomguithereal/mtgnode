/*
| -------------------------------------------------------------------
|  MTGNode DeckBuilder Domino Controller
| -------------------------------------------------------------------
|
|
|	Author : Yomguithereal
|	Version : 1.0
*/

;(function($, w, domino, CardTemplate, undefined){
	"use strict";

	// Domino Settings
	//=================
	domino.settings({
		// verbose: true,
		// displayTime: true,
		mergeRequests: false
	});

	// Domino Instance
	//======================
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
			},

			// Right Panel
			{
				id: 'deckCards',
				value: [],
				label: 'Card of the deck.',
				type: 'array',
				dispatch: 'deckCardsUpdated',
			}
		]
		,services: [
			{
				id: 'getSetCards',
				setter: 'viewedCards',
				url: 'ajax/deck-builder/set/:set'
			},
			{
				id: 'getDeckCards',
				setter: 'deckCards',
				url: 'ajax/deck-builder/deck/:deck_id'
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
			},
			{
				triggers: 'deckSelected',
				method: function(event){
					this.request('getDeckCards', {
						shortcuts: {
							deck_id: event.data
						}
					});
				}
			},
		]
	});

	// Template Engine
	//=================
	var __leftTemplate = new CardTemplate('leftcard');
	var __rightTemplate = new CardTemplate('rightcard');
	
	// Left Panel
	//==============
	function LeftPanel(){
		domino.module.call(this);

		// Variables
		var self = this;
		var $set_select = $("#set_select");
		var $panel = $('#left_panel');

		// Emettor
		//------------
		$set_select.change(function(){
			var set = $(this).val();

			if(set != 'none'){
				self.dispatchEvent('setSelected', set);
			}
		});

		// Receptor
		//----------
		this.triggers.events['viewedCardsUpdated'] = function(d){
			$panel.empty();
			d.get('viewedCards').forEach(function(card){
				$panel.append(__leftTemplate.render(card));
			});
		}
	}

	// Right Panel
	//==============
	function RightPanel(){
		domino.module.call(this);

		// Variables
		var self = this;
		var $deck_select = $('#deck_select');
		var $panel = $("#right_panel");

		// Emettor
		//------------
		$deck_select.change(function(){
			var deck = $(this).val();
			if(deck != '-none-'){
				self.dispatchEvent('deckSelected', deck);
			}
		});

		// Receptor
		//------------
		this.triggers.events['deckCardsUpdated'] = function(d){
			$panel.empty();
			d.get('deckCards').forEach(function(card){
				$panel.append(__rightTemplate.render(card));
			});
		}
	}

	// Controls
	//===========
	function Controls(){
		domino.module.call(this);
	}

	// Launching
	//==============

	// Instanciating Modules
	var leftPanel = controller.addModule(LeftPanel);
	var rightPanel = controller.addModule(RightPanel);
	var controls = controller.addModule(Controls);

	// Instanciating Widgets
	$('#card_viewer_widget').cardViewerWidget({container: '#deck_builder_container', cards: '.card-min-deckbuilder'});


})(jQuery, window, domino, CardTemplate);