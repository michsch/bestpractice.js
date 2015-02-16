### global
  define,
  module,
  require
###

((root, factory) ->
  'use strict'

  if typeof define == 'function' and define.amd
    define ['jquery'], factory
  else if typeof exports == 'object'
    module.exports = factory(require('jquery'))
  else if typeof root.jQuery == 'function'
    factory(root.jQuery)

  return
) (typeof window == 'object' and window) or @, ($) ->
  'use strict'

  myPlugin =
    init: (options) ->
      _this = @

      defaults =
        resize: true
        firstLoad: true

      o = $.extend(defaults, options or {})

      @each( ->
        $el = $ @
        _this.doSomething($el)
        return
      )

    doSomething: ($el) ->
      true

  $.fn.myPlugin = (method) ->
    if myPlugin[method]
      myPlugin[method].apply this, Array::slice.call(arguments, 1)
    else if typeof method == 'object' or not method
      myPlugin.init.apply this, arguments
    else
      $.error 'Method ' + method + ' does not exist on jQuery.myPlugin'

  $
