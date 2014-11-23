/**
 * Helpers
 * ========
 *
 * Miscellaneous script helpers.
 */

module.exports = {
  validSet: function(set) {
    return (!~['ATH', 'ITP', 'DKM', 'RQS', 'DPA'].indexOf(set.code) &&
            set.code.charAt(0) !== 'p');
  }
};
