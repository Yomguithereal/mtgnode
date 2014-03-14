(function(undefined) {
  'use strict';

  /**
   * Generic Utilities
   * ==================
   *
   * Package initializers to hack concatenation.
   */
  var _root = this;

  var _pkg = function(pkgName, content) {
    content = (content !== undefined) ? content : {};

    return (pkgName || '').split('.').reduce(function(context, objName) {
      return (objName in context) ?
        context[objName] :
        (context[objName] = content);
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
