(function(undefined) {
  'use strict';

  /**
   * Generic Utilities
   * ==================
   *
   * Package initializers to hack concatenation.
   */
  var _root = this;

  // Define a package
  function pkg(pkgName, content) {
    content = (content !== undefined) ? content : {};

    return (pkgName || '').split('.').reduce(function(context, objName, i, a) {
      return (objName in context) ?
        context[objName] :
        (context[objName] = (i === a.length - 1) ? content : {});
    }, _root);
  };

  // Apply a function if it exists
  function optapply(scope, fn, args) {
    if (typeof fn === 'function')
      fn.apply(scope, args);
  }

  // Call a function if it exists
  function otpcall(scope, fn) {
    if (typeof fn === 'function')
      fn.apply(scope, Array.prototype.slice.call(arguments, 2));
  }

  /**
   * Exporting
   * ----------
   */
  this.utilities = {
    optapply: optapply,
    optcall: otpcall,
    pkg: pkg
  };
}).call(this);
