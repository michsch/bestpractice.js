
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
  var MyPlugin, _slice;
  _slice = [].slice;
  MyPlugin = (function() {
    function MyPlugin(el, options) {
      this.o = $.extend({}, this.defaults, options);
      this.$el = $(el);
    }

    MyPlugin.prototype.defaults = {
      paramA: 'foo',
      paramB: 'bar'
    };

    MyPlugin.prototype.init = function() {
      this.myMethod();
      return this;
    };

    MyPlugin.prototype.myMethod = function(echo) {
      return this.$el.html(this.o.paramA + ': ' + echo);
    };

    return MyPlugin;

  })();
  $.fn.extend({
    myPlugin: function() {
      var args, option;
      option = arguments[0];
      args = 2 <= arguments.length ? _slice.call(arguments, 1) : [];
      return this.each(function() {
        var $this, data;
        $this = $(this);
        data = $this.data('myPlugin');
        if (!data) {
          $this.data('myPlugin', (data = new MyPlugin(this, option)));
          data.init();
        }
        if (typeof option === 'string' && typeof data[option] === 'function' && !data.hasOwnProperty(option)) {
          return data[option].apply(data, args);
        }
      });
    }
  });
  return $;
});
