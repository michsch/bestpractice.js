
/**
 * How jQuery creates it's own function and objects
 *
 * instead of $ for jQuery we'll use Ʃ vor our object.
 */

/* create IIFE first */
var myDomObject;

(function($, window) {

  /* jQuery doesn't use 'use strict' because of Firefox and arguments.caller.callee */
  'use strict';

  /* initialize new object */
  var Ʃ;
  Ʃ = function(obj) {
    return new Ʃ.fn.init(obj);
  };

  /* functions that should use the selected jQuery DOM object */
  Ʃ.fn = Ʃ.prototype = {
    init: function(obj) {
      this.obj = $(obj);
      return this;
    },
    firstChild: function() {
      return this.obj = this.obj.children(':first');
    },
    getActive: function() {
      return this.obj = this.obj.find('.active');
    }
  };
  Ʃ.fn.init.prototype = Ʃ.fn;

  /* some helper function */
  $.extend(Ʃ, {
    isArray: function(object) {
      return $.isArray(object);
    }
  });

  /* set global function */
  return window.Ʃ = Ʃ;
})(window.jQuery, window);


/**
 * Now u can use Ʃ like the jQuery function
 */

myDomObject = window.Ʃ('#selector');

myDomObject.firstChild().getActive();
