/*
| -------------------------------------------------------------------
|  MTGNode Card Contextual Menu Plugin
| -------------------------------------------------------------------
|
|
| Author : Yomguithereal
| Version : 1.0
*/

;(function ( $, window, document, undefined ) {

  // Create the defaults once
  var pluginName = "contextualize";
  var defaults = {
    container : '#context_menu'
  };

  // Actual Constructor
  function Plugin ( element, options ) {
    this.element = element;
    this.$selector = $(this.element);
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  // Plugin Core
  Plugin.prototype = {
    init: function () {
      var _this = this;

      // Registering context menu
      $('body').on('contextmenu', this.settings.selector, function(e) {

        // Preventing default behaviour
        e.preventDefault();

        // Making the context menu appear
        _this.$selector.css({
          display: 'block',
          left: e.pageX,
          top: e.pageY
        });

        return false;
      });

      // Action on click
      this.$selector.on('click', 'a', function(e) {

        // Preventing default behaviour
        e.preventDefault();

        // Getting action and trigger callback
        var action = $(this).attr('data-action');
        _this.settings.callback(action);

        // Closing menu
        _this.$selector.hide();

        return false;
      });

      // If user click away
      $(document).click(function() {
        _this.$selector.hide();
      });
    }
  };

  // Exporter
  $.fn[ pluginName ] = function ( options ) {
    return this.each(function() {
      if ( !$.data( this, "plugin_" + pluginName ) ) {
        $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
      }
    });
  };

})( jQuery, window, document );
