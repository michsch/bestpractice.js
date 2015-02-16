
/* global
  define,
  module
 */
(function(root, factory, name) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root[name] = factory();
  }
})((typeof window === 'object' && window) || this, function() {
  'use strict';
  return function(url, callback) {
    var cache, script;
    cache = Math.round((new Date()).getTime() / 1000);
    script = document.createElement('script');
    script.async = true;
    script.src = url + '?' + cache;
    if (typeof script.addEventListener === 'function') {
      script.addEventListener('load', function() {
        return callback();
      });
    } else if (typeof script.onload === 'object') {
      script.onload = callback;
    } else if (script.onreadystatechange != null) {
      script.onreadystatechange = function() {
        if (this.readyState === 'complete') {
          return callback();
        }
      };
    }
    return document.body.appendChild(script);
  };
}, 'loadScript');
