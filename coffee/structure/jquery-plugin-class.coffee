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

  _slice = [].slice

  # Define the plugin class
  class MyPlugin
    constructor: (el, options) ->
      @o = $.extend {}, @defaults, options
      @$el = $ el

    defaults:
      paramA: 'foo'
      paramB: 'bar'

    init: ->
      @myMethod()
      @

    # Additional plugin methods go here
    myMethod: (echo) ->
      @$el.html @o.paramA + ': ' + echo

  # Define the plugin
  $.fn.extend myPlugin: () ->
    option = arguments[0]
    args = if 2 <= arguments.length then _slice.call(arguments, 1) else []

    @each ->
      $this = $ @
      data = $this.data 'myPlugin'

      if !data
        $this.data 'myPlugin', (data = new MyPlugin(@, option))
        data.init()

      if typeof option == 'string' and
      typeof data[option] is 'function' and
      not data.hasOwnProperty(option)
        data[option].apply data, args

  $
