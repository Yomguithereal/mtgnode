/*
| -------------------------------------------------------------------
|  MTGNode Playground Battlefield Module
| -------------------------------------------------------------------
|
|
| Author : Yomguithereal
| Version : 1.0
*/

;(function($, w, undefined){
  'use strict';

  // Deck Module
  //=============
  function BattlefieldModule(_side) {
    domino.module.call(this);
    var _this = this;

    var _area = Helpers.getArea(_side),
        _cardSelector = Helpers.getCardSelectorFunc(_side),
        _template = new CardTemplate(_side);

    // Selectors
    var $game_area = $('.game-area'),
        $battlefield = $('.game-emplacement'),
        $menu = $('#battlefield_context_menu');

    // Properties
    //------------
    this.height = $game_area.height();
    this.cards = '.card-min.in-game.'+_side;

    // Emettor
    //---------
    if (_side === 'my') {

      // Dropping card in game
      $battlefield.droppable({
        tolerance: 'intersect',
        drop: function(e, ui) {
          var $card = $(ui.draggable);

          Helpers.dropEvents({
            card: $card,
            domino: _this,
            interactions: [
              {
                class: 'in-graveyard',
                event: 'myResurrectCard'
              },
              {
                class: 'in-hand',
                event: 'myPlayCard'
              },
              {
                class: 'in-exile',
                event: 'myMiracleCard'
              }
            ]
          });

          // If card is a land, we reorganize land z-indexes
          if ($card.hasClass('land')) {
            var zIndexes = [],
                lands = [];

            $('.land.in-game').each(function() {
              zIndexes.push($(this).css('z-index'));
              lands.push($(this));
            });

            // Sorting
            zIndexes = zIndexes.sort(function(a, b) { return a - b; });
            lands = lands.sort(function(a, b) {
              return a.position().top - b.position().top;
            });

            // Recomputing z-index
            lands.map(function(l, i) {
              l.css('z-index', zIndexes[i]);
            });
          }
        }
      });

      // Tapping a card
      $game_area.on('click', this.cards, function() {
        $(this).toggleClass('tapped');
        _this.dispatchEvent('sendRealtimeMessage', {
          head: 'opTappedCard',
          body: {
            id: +$(this).attr('number')
          }
        })
      });

      // Contextual Menu
      $menu.contextualize({
        selector: '.game-emplacement.'+_area,
        actions: {
          untapAll: function() {

            // Preventing if unnecessary
            if ($(_this.cards+'.tapped').length === 0)
              return false;

            _this.dispatchEvent('myUntapAll');
            _this.dispatchEvent('sendRealtimeMessage', {
              head: 'opUntapAll'
            });
          }
        }
      });
    }

    // Receptor
    //----------

    // Opponent dragged a card
    this.triggers.events[_side+'CardDragged'] = function(d, e) {
      var $card = _cardSelector(e.data.id);

      $card.css({
        top: _this.height - e.data.top - $card.height(),
        left: e.data.left,
        'z-index': e.data.zindex
      });
    }

    // Card Played
    this.triggers.events[_side+'PlayCard'] = function(d, e) {
      var $card = _cardSelector(e.data.id);

      $card.removeClass('in-hand');
      $card.addClass('in-game');

      if (_side === 'op') {
        $card.removeClass('flipped');
      }

      _this.dispatchEvent(_side+'ReorganizeHand');
    }

    // Card Tapped
    this.triggers.events[_side+'TappedCard'] = function(d, e) {
      var $card = _cardSelector(e.data.id);
      $card.toggleClass('tapped');
    }

    // All Cards Tapped
    this.triggers.events[_side+'UntapAll'] = function(d, e) {
      var $cards = $(_this.cards);
      $cards.removeClass('tapped');
    }

    // Card Resurrected and Miracled
    function backToGame(d, e) {
      var $card = _cardSelector(e.data.id);
      $card.removeClass('in-graveyard in-exile in-hand');
      $card.addClass('in-game');
    }

    this.triggers.events[_side+'ResurrectCard'] = backToGame;
    this.triggers.events[_side+'MiracleCard'] = backToGame;
  }


  // Deck Hacks
  //============
  var _hacks = [
    {
      triggers: 'myUntapAll'
    },
    {
      triggers: 'opUntapAll'
    }
  ];
  _hacks = _hacks
    .concat(Helpers.fromToHacks(
      'Hand',
      'Battlefield',
      'PlayCard'
    ))
    .concat(Helpers.fromToHacks(
      'Graveyard',
      'Battlefield',
      'ResurrectCard'
    ))
    .concat(Helpers.fromToHacks(
      'Exile',
      'Battlefield',
      'MiracleCard'
    ));

  // Exporting
  //===========
  window.BattlefieldModule = BattlefieldModule;
  window.battlefieldHacks = _hacks;
})(jQuery, window);
