/*
| -------------------------------------------------------------------
|  MTGNode Contextual Menu Plugin
| -------------------------------------------------------------------
|
| Author : Yomguithereal
| Version : 1.0
*/
;(function(undefined) {

  // Create the defaults once
  var pluginName = "contextualize";
  var defaults = {
    container: '#context_menu',
    position: 'bottom',
    scope: this,
  };

  // Actual Constructor
  function Plugin(element, options) {
    this.element = element;
    this.$selector = $(this.element);
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;

    // Launching
    this.init();
  }

  // Plugin Core
  Plugin.prototype = {
    init: function() {
      var _this = this;

      // Registering context menu
      $('body').on('contextmenu', this.settings.selector, function(e) {

        // Preventing default behaviour
        e.preventDefault();

        // Making the context menu appear
        var top = (_this.settings.position === 'bottom') ?
          e.pageY :
          e.pageY - _this.$selector.height();

        _this.$selector.css({
          display: 'block',
          left: e.pageX,
          top: top
        });

        return false;
      });

      // Action on click
      this.$selector.on('click', 'a', function(e) {

        // Preventing default behaviour
        e.preventDefault();

        // Getting action and trigger callback
        var action = $(this).attr('data-action');

        // Callback if present
        utilities.optcall(_this.settings.scope, _this.settings.actions[action]);

        // Closing menu
        _this.$selector.hide();

        return false;
      });

      // If user clicks away
      $(document).click(function() {
        _this.$selector.hide();
      });
    }
  };

  // Exporter
  $.fn[pluginName] = function (options) {
    return this.each(function() {
      if (!$.data( this, "plugin_" + pluginName)) {
        $.data( this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };
}).call(this);
