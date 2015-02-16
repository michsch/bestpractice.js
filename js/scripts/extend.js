
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
  var class2type, extend, hasOwn, support, toString, typeName, types, version, _i, _len, _private, _ref;
  version = '0.0.1';
  class2type = {};
  toString = class2type.toString;
  hasOwn = class2type.hasOwnProperty;
  support = {};
  types = 'Boolean Number String Function Array Date RegExp Object Error';
  _ref = types.split(' ');
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    typeName = _ref[_i];
    class2type['[object ' + typeName + ']'] = typeName.toLowerCase();
  }
  _private = {

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
     * Check if an object is a real plain object (not a DOM or the window
     * object).
     *
     * @method isPlainObject
     * @param {Object} obj  object to check
     * @returns {Boolean} true if is a plain object
     */
    isPlainObject: function(obj) {
      var key, _j, _len1;
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
        for (_j = 0, _len1 = obj.length; _j < _len1; _j++) {
          key = obj[_j];
          return hasOwn.call(obj, key);
        }
      }
      for (key in obj) {
        continue;
      }
      return key === void 0 || hasOwn.call(obj, key);
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
    }
  };

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
  extend = function() {
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
    if (typeof target !== 'object' && !_private.isFunction(target)) {
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
          if (deep && copy && (_private.isPlainObject(copy) || (copyIsArray = _private.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && _private.isArray(src) ? src : [];
            } else {
              clone = src && _private.isPlainObject(src) ? src : {};
            }
            target[name] = extend(deep, clone, copy);
          } else if (copy !== void 0) {
            target[name] = copy;
          }
        }
      }
      i++;
    }
    return target;
  };
  return extend;
}, 'extend');
