### global
  define,
  module
###
((root, factory, name) ->
  'use strict'

  if typeof define == 'function' and define.amd
    define factory
  else if typeof exports == 'object'
    module.exports = factory()
  else
    root[name] = factory()

  return
) (typeof window == 'object' and window) or @, () ->
  'use strict'

  version = '0.1.0'

  class2type = {}
  toString = class2type.toString
  hasOwn = class2type.hasOwnProperty
  support = {}
  types = 'Boolean Number String Function Array Date RegExp Object Error'

  for typeName in types.split(' ')
    class2type['[object ' + typeName + ']'] = typeName.toLowerCase()

  _private =
    ###*
     * Check if an object is a function.
     *
     * @method isFunction
     * @param obj   object to check
     * @returns {Boolean} true if object is a function
    ###
    isFunction: (obj) ->
      @type(obj) == 'function'

    ###*
     * Check if an object is a real plain object (not a DOM or the window
     * object).
     *
     * @method isPlainObject
     * @param {Object} obj  object to check
     * @returns {Boolean} true if is a plain object
    ###
    isPlainObject: (obj) ->
      if !obj or @type(obj) != 'object' or obj.nodeType or
      @isWindow(obj)
        return false

      try
        if obj.constructor and !hasOwn.call(obj, 'constructor') and
        !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')
          return false

      catch
        return false

      if support.ownLast
        for key in obj
          return hasOwn.call obj, key

      for key of obj
        continue

      return key == undefined or hasOwn.call(obj, key)

    ###*
     * Check if an object is a real array.
     *
     * @method isArray
     * @param obj   object to check
     * @returns {Boolean} true if is a real array
    ###
    isArray: Array.isArray or (obj) ->
      @type(obj) == 'array'

    ###*
     * Check if an object is the window object.
     *
     * @method isWindow
     * @param {Object}  obj   the object to check
     * @returns {Boolean} true if the object is the window object
    ###
    isWindow: (obj) ->
      ### jshint eqeqeq: false ###
      obj? && obj == obj.window

    ###*
     * Get the type of a variable.
     *
     * @method type
     * @param obj value to check
     * @returns {String} type of given variable as string
    ###
    type: (obj) ->
      if obj == null
        return obj + ''

      if typeof obj == 'object' or typeof obj == 'function'
        return class2type[toString.call(obj)] or 'object'
      else
        return typeof obj

  ###*
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
  ###
  extend = ->
    target = arguments[0] || {}
    i = 1
    length = arguments.length
    deep = false

    # Handle a deep copy situation
    if typeof target == 'boolean'
      deep = target

      # skip the boolean and the target
      target = arguments[i] || {}
      i++

    # Handle case when target is a string or something (possible in deep copy)
    if typeof target != 'object' and !_private.isFunction(target)
      target = {}

    # extend Bookmarklet itself if only one argument is passed
    if i == length
      target = this
      i--

    while i < length
      # Only deal with non-null/undefined values
      if (options = arguments[i])?
        # Extend the base object
        for name of options
          src = target[name]
          copy = options[name]

          # Prevent never-ending loop
          if target == copy
            continue

          # Recurse if we're merging plain objects or arrays
          if deep and copy and (_private.isPlainObject(copy) or
          (copyIsArray = _private.isArray(copy)))
            if copyIsArray
              copyIsArray = false
              clone = if src and _private.isArray(src) then src else []
            else
              clone = if src and _private.isPlainObject(src) then src else {}

            # Never move original objects, clone them
            target[name] = extend(deep, clone, copy);

          # Don't bring in undefined values
          else if copy != undefined
            target[name] = copy
      i++

    # Return the modified object
    return target

  extend
, 'extend'
