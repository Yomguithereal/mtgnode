(function(undefined) {
  'use strict';

  /**
   * Playground Helpers
   * ===================
   *
   */

  // Helpers namespace
  var _hacks = [
    {
      triggers: 'game.start',
      method: function(e) {

        // Updating basic info
      }
    }
  ];

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.hacks', _hacks);
}).call(this);




    // {
    //   triggers: 'startGame',
    //   method: function(e) {

    //     // Game basic info
    //     this.gameId = e.data.game.id;
    //     this.debug = e.data.game.debug;

    //     // Player Sides
    //     // TODO: this is dirty!
    //     var uid = +$('#uid').val();

    //     if (e.data.game.player1.user.id === uid) {
    //       this.mySide = 1;
    //       this.opSide = 2;
    //     }
    //     else {
    //       this.mySide = 2;
    //       this.opSide = 1;
    //     }

    //     this.myUser = e.data.game['player'+this.mySide].user;
    //     this.opUser = e.data.game['player'+this.opSide].user;

    //     // Instanciating delayed modules
    //     this.dispatchEvent('delayedModules');

    //     // Passing to deck choice modal