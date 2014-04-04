(function(undefined) {
  'use strict';

  /**
   * Playground Hacks
   * =================
   *
   */
  var _hacks = [
    {
      triggers: 'game.start',
      method: function(e) {

        // Player sides
        var one = (e.data.game.player1.user.id === USER.id);
        this['my-side'] = one ? 1 : 2;
        this['op-side'] = one ? 2 : 1;

        // User per side
        this['my-user'] = e.data.game['player' + this['my-side']].user;
        this['op-user'] = e.data.game['player' + this['op-side']].user;

        // Instanciating delayed modules
        this.dispatchEvent('modules.delayed');

        // Passing to deck choice modal
        this.dispatchEvent('deck.choice');
      }
    },
    {
      triggers: ['deck.selected'],
      method: function(e) {
        var service = (e.data.side === 'my') ?
          'getMyDeckCards' :
          'getOpDeckCards';

        this.request(service, {
          shortcuts: {
            id: e.data.id
          }
        });
      }
    },
    {
      triggers: ['card.move'],
      method: function(e) {
        if (e.data.side === 'my') {
          var card = playground.helpers.fromTo(
            this,
            'my-' + e.data.from,
            'my-' + e.data.to,
            e.data.id
          );

          if (!card)
            return false;

          this.dispatchEvent('realtime.send', {
            head: 'card.move', 
            body: {
              id: card.id,
              side: 'op',
              from: e.data.from,
              to: e.data.to,
              event: e.data.event
            }
          });

          if (e.data.event !== undefined) {
            this.dispatchEvent(e.data.event, {card: card, side: 'my'});
          }
        }
        else {
          var card = playground.helpers.fromTo(
            this,
            'op-' + e.data.from,
            'op-' + e.data.to,
            e.data.id
          );

          if (e.data.event !== undefined) {
            this.dispatchEvent(e.data.event, {card: card, side: 'op'});
          }
        }
      }
    },
    {
      triggers: 'card.dragged'
    }
  ];

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.hacks', _hacks);
}).call(this);
