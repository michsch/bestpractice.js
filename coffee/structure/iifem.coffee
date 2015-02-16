### global
  define,
  module
###

((root, factory, name) ->
  'use strict'

  if typeof define == 'function' and define.amd
    define factory
  else if typeof exports == 'object'
    module.exports = factory
  else
    root[name] = factory

  return
) (typeof window == 'object' and window) or @, () ->
  'use strict'

  exports = exports || {}

  exports
, 'name'
