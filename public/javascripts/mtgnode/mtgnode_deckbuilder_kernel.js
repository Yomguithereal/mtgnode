/*
| -------------------------------------------------------------------
|  MTGNode Deck Builder Kernel
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
*/


function MTGNodeDeckBuilderKernel(){

	var self = this;

	/*
	| -------------
	|  Card Actions
	| -------------
	*/

	// Variables
	//-------------

	// Selectors
	var $card_viewer = $('#card_viewer_widget');
	var $card = $('.card-min');

	var $set_selector = $('#set_select');
	var $left_panel = $('#deck_builder_left_panel');

	// Variables


	// Card Viewer Widget
	//-------------------
	$left_panel.on('mouseover', $card, function(e){
		var src_to_see = $(e.target).attr('src');
		$card_viewer.attr('src', src_to_see);
	});

	// Changing Extension
	//-------------------
	$set_selector.change(function(){

		// Getting the selected set
		var selected_set = $set_selector.val();
		if(selected_set != 'none'){

			// Calling ajax
			$left_panel.load('ajax/select_set', {'selected_set' : selected_set});
		}
	});

}