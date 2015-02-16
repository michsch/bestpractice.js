
/* global
  define,
  module,
  require
 */
(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else if (typeof root.jQuery === 'function') {
    factory(root.jQuery);
  }
})((typeof window === 'object' && window) || this, function($) {
  'use strict';
  var myPlugin;
  myPlugin = {
    init: function(options) {
      var defaults, o, _this;
      _this = this;
      defaults = {
        resize: true,
        firstLoad: true
      };
      o = $.extend(defaults, options || {});
      return this.each(function() {
        var $el;
        $el = $(this);
        _this.doSomething($el);
      });
    },
    doSomething: function($el) {
      return true;
    }
  };
  $.fn.myPlugin = function(method) {
    if (myPlugin[method]) {
      return myPlugin[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return myPlugin.init.apply(this, arguments);
    } else {
      return $.error('Method ' + method + ' does not exist on jQuery.myPlugin');
    }
  };
  return $;
});
