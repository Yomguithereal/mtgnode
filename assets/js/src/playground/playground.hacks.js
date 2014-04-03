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
      triggers: ['my-deck.selected', 'op-deck.selected'],
      method: function(e) {
        var service = (e.type === 'my-deck.selected') ?
          'getMyDeckCards' :
          'getOpDeckCards';

        this.request(service, {
          shortcuts: {
            id: e.data
          }
        });
      }
    }
  ];

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.hacks', _hacks);
}).call(this);
