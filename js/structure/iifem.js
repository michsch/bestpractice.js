
/* global
  define,
  module
 */
(function(root, factory, name) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root[name] = factory;
  }
})((typeof window === 'object' && window) || this, function() {
  'use strict';
  var exports;
  exports = exports || {};
  return exports;
}, 'name');
