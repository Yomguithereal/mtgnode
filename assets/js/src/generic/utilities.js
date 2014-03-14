(function(undefined) {
  'use strict';

  /**
   * Generic Utilities
   * ==================
   *
   * Package initializers to hack concatenation.
   */
  var _pkg = function(pkgName) {
    return (pkgName || '').split('.').reduce(function(context, objName) {
      return (objName in context) ?
        context[objName] :
        (context[objName] = {});
    }, _root);
  };

  /**
   * Exporting
   * ----------
   */
  this.utilities = {
    pkg: _pkg
  };
}).call(this);
