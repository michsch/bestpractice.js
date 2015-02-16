
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
  var Exports, class2type, exports, hasOwn, support, toString, version;
  version = '0.1.0';
  class2type = {};
  toString = class2type.toString;
  hasOwn = class2type.hasOwnProperty;
  support = {};
  Exports = (function() {
    function Exports() {}

    Exports.fn = Exports.prototype = {

      /**
       * @property isReady
       * @type Boolean
       * @default true
       */
      isReady: true,

      /**
       * Create an error message
       *
       * @method error
       * @returns void
       */
      error: function(msg) {
        throw new Error(msg);
      },

      /**
       * Empty function
       * You can use this empty function when you wish to pass around a function
       * that will do nothing.
       *
       * @method noop
       * @returns void
       */
      noop: function() {},

      /**
       * Check if an object is a function.
       *
       * @method isFunction
       * @param obj   object to check
       * @returns {Boolean} true if object is a function
       */
      isFunction: function(obj) {
        return this.type(obj) === 'function';
      },

      /**
       * Check if an object is a real array.
       *
       * @method isArray
       * @param obj   object to check
       * @returns {Boolean} true if is a real array
       */
      isArray: Array.isArray || function(obj) {
        return this.type(obj) === 'array';
      },

      /**
       * Check if an object is like an array (e.g. DOM elements).
       *
       * @method isArrayLike
       * @param obj   object to check
       * @returns {Boolean} true if object is like an array
       */
      isArraylike: function(obj) {
        var lastPos, length, type;
        length = obj.length;
        lastPos = length - 1;
        type = this.type(obj);
        if (type === 'function' || this.isWindow(obj)) {
          return false;
        }
        if (obj.nodeType === 1 && length) {
          return true;
        }
        return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && lastPos in obj;
      },

      /**
       * Check if an object is the window object.
       *
       * @method isWindow
       * @param {Object}  obj   the object to check
       * @returns {Boolean} true if the object is the window object
       */
      isWindow: function(obj) {

        /* jshint eqeqeq: false */
        return (obj != null) && obj === obj.window;
      },

      /**
       * Check if a variable is numeric.
       *
       * @method isNumeric
       * @param obj   object to check if is numeric
       * @returns {Boolean} true if object is numeric
       */
      isNumeric: function(obj) {
        return !this.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
      },

      /**
       * Check if an object is empty or not.
       *
       * @method isEmptyObject
       * @param {Object} obj  object to check
       * @returns {Boolean} true if object is empty, false if not
       */
      isEmptyObject: function(obj) {
        var name, _i, _len;
        for (_i = 0, _len = obj.length; _i < _len; _i++) {
          name = obj[_i];
          return false;
        }
        return true;
      },

      /**
       * Check if an object is a real plain object (not a DOM or the window
       * object).
       *
       * @method isPlainObject
       * @param {Object} obj  object to check
       * @returns {Boolean} true if is a plain object
       */
      isPlainObject: function(obj) {
        var key, _i, _len;
        if (!obj || this.type(obj) !== 'object' || obj.nodeType || this.isWindow(obj)) {
          return false;
        }
        try {
          if (obj.constructor && !hasOwn.call(obj, 'constructor') && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
            return false;
          }
        } catch (_error) {
          return false;
        }
        if (support.ownLast) {
          for (_i = 0, _len = obj.length; _i < _len; _i++) {
            key = obj[_i];
            return hasOwn.call(obj, key);
          }
        }
        for (key in obj) {
          continue;
        }
        return key === void 0 || hasOwn.call(obj, key);
      },

      /**
       * Get the type of a variable.
       *
       * @method type
       * @param obj value to check
       * @returns {String} type of given variable as string
       */
      type: function(obj) {
        if (obj === null) {
          return obj + '';
        }
        if (typeof obj === 'object' || typeof obj === 'function') {
          return class2type[toString.call(obj)] || 'object';
        } else {
          return typeof obj;
        }
      },

      /**
       * Go through each index inside an array or through each key of an object.
       *
       * @method each
       * @param {Array|Object} obj    Array or object for the loop.
       * @param {Function} [callback] Callback function executed inside the
       *                              loop.
       * @param {Array}    [args]     Arguments for the callback function.
       * @returns {Array|Object}      the object used for the loop.
       */
      each: function(obj, callback, args) {
        var i, isArray, length, value;
        i = 0;
        length = obj.length;
        isArray = this.isArraylike(obj);
        if (args) {
          if (isArray) {
            while (i < length) {
              value = callback.apply(obj[i], args);
              if (value === false) {
                break;
              }
              i++;
            }
          } else {
            for (i in obj) {
              value = callback.apply(obj[i], args);
              if (value === false) {
                break;
              }
            }
          }
        } else {
          if (isArray) {
            while (i < length) {
              value = callback.call(obj[i], i, obj[i]);
              if (value === false) {
                break;
              }
              i++;
            }
          } else {
            for (i in obj) {
              value = callback.call(obj[i], i, obj[i]);
              if (value === false) {
                break;
              }
            }
          }
        }
        return obj;
      }
    };

    return Exports;

  })();
  Exports.fn.each('Boolean Number String Function Array Date RegExp Object Error'.split(' '), function(i, name) {
    return class2type['[object ' + name + ']'] = name.toLowerCase();
  });

  /**
   * Extend en object with another object.
   *
   * @method extend
   * @param {Boolean} [deep=false]  If true make a deep extend through every
   *                                child level.
   * @param {Object}  [target]      Target object, where the new extended object
   *                                should be stored in. Can be an empty object.
   * @param {Object}  src           Source object where the extended data will
   *                                be stored, if there is no target object.
   * @param {Object}  options       The object which should be extended into the
   *                                source object. If a target is set, the
   *                                options object will extend the source object
   *                                and saved into the target object. The source
   *                                object won't change.
   * @returns {Object} new extended object
   */
  Exports.extend = Exports.fn.extend = function() {
    var clone, copy, copyIsArray, deep, i, length, name, options, src, target;
    target = arguments[0] || {};
    i = 1;
    length = arguments.length;
    deep = false;
    if (typeof target === 'boolean') {
      deep = target;
      target = arguments[i] || {};
      i++;
    }
    if (typeof target !== 'object' && !exports.isFunction(target)) {
      target = {};
    }
    if (i === length) {
      target = this;
      i--;
    }
    while (i < length) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (deep && copy && (exports.isPlainObject(copy) || (copyIsArray = exports.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && exports.isArray(src) ? src : [];
            } else {
              clone = src && exports.isPlainObject(src) ? src : {};
            }
            target[name] = exports.extend(deep, clone, copy);
          } else if (copy !== void 0) {
            target[name] = copy;
          }
        }
      }
      i++;
    }
    return target;
  };
  Exports.fn.extend({
    _version: version
  });
  return exports = new Exports();
}, 'helper');
