/*
| -------------------------------------------------------------------
|  MTGNode Playground Helpers
| -------------------------------------------------------------------
|
|
| Author : Yomguithereal
| Version : 1.0
*/

;(function($, w, undefined){
  'use strict';

  // Cached Properties
  //===================
  var _templates = {
    my: new CardTemplate('my'),
    op: new CardTemplate('op')
  };

  var _baseZ = 30,
      _maxZ = 30;

  // Methods
  //=========

  // Getting top or bottom
  function _getArea(side) {
    return (side === 'my') ? 'bottom' : 'top';
  }

  // Getting identifier function
  function _getCardSelectorFunc(side) {
    return function(id) {
      return $('#'+side+'_'+id);
    }
  }

  // Getting your side's template engine
  function _getTemplate(side) {
    return _templates[side];
  }

  // Adding some properties to deck cards
  function _flag(cards, side) {
    return cards.map(function(c, i) {

      // Unique card id
      c.id = i;

      // Card html
      c.html = _templates[side].render(c, c.id);
      c.search_html = _templates[side].renderSearch(c, c.id);
      return c;
    });
  }

  // Droping events
  function _dropEvents(params) {
    for (var i = 0; i < params.interactions.length; i++) {

      // Checking every interaction until one is found
      if (params.card.hasClass(params.interactions[i].class)) {

        // Dispatching domino event
        params.domino.dispatchEvent(params.interactions[i].event, {
          id: +params.card.attr('number')
        });

        // Triggering Callback if any
        if (params.interactions[i].callback !== undefined)
          params.interactions[i].callback();

        break;
      }
    }
  }

  // Moving a card from a model to another
  function _fromTo(d, from, to, id) {

    var fromModel = d.get(from),
        toModel = d.get(to);

    // Returning false if the model is empty
    if (fromModel.length === 0)
      return false;

    // Finding first card
    if (id === undefined) {
      var card = fromModel.shift();
    }
    else {
      var card = _.remove(fromModel, function(c) {
        return c.id === id;
      })[0];
    }

    toModel.unshift(card);

    // Updating model
    d[from] = fromModel;
    d[to] = toModel;

    return card;
  }

  // Generating From To hacks
  function _fromToHacks(from, to, eventName) {
    return [
      {
        triggers: 'my'+eventName,
        method: function(e) {
          var card = _fromTo(this, 'my'+from, 'my'+to, e.data.id);

          if (!card)
            return false;

          this.dispatchEvent('sendRealtimeMessage', {
            head: 'op'+eventName,
            body: {
              id: card.id
            }
          });
        }
      },
      {
        triggers: 'op'+eventName,
        method: function(e) {
          var card = _fromTo(this, 'op'+from, 'op'+to, e.data.id);
        }
      }
    ];
  }

  // Updating the zindex of a selected card
  function _updateZ($card) {

    if ($card.hasClass('enchantment') &&
        $card.hasClass('ui-draggable-dragging')) {
      $card.css('z-index', _baseZ);
    }
    else {
      _maxZ += 1;
      $card.css('z-index', _maxZ);
    }
  }

  // Registering a card as draggable
  function _registerDraggable($card, drag_func) {
    var snap_zone = [
      '.hand-emplacement.bottom',
      '.game-emplacement.bottom',
      '.graveyard-emplacement.bottom',
      '.exile-emplacement.bottom'
    ];

    $card.draggable({
      containment: '.game-area',
      snap: snap_zone.join(', '),
      grid: [10, 10],
      drag: drag_func
    });

    $card.draggable('enable');
  }


  // Exporting
  //===========
  window.Helpers = {

    // Modules pieces
    getArea: _getArea,
    getTemplate: _getTemplate,
    getCardSelectorFunc: _getCardSelectorFunc,

    // Quick interaction with domino
    flag: _flag,
    fromTo: _fromTo,
    fromToHacks: _fromToHacks,

    // Dom manipulation
    updateZ: _updateZ,
    registerDraggable: _registerDraggable,
    dropEvents: _dropEvents
  };
})(jQuery, window);
