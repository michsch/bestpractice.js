###*
 * How jQuery creates it's own function and objects
 *
 * instead of $ for jQuery we'll use Ʃ vor our object.
###

### create IIFE first ###
(($, window) ->
  ### jQuery doesn't use 'use strict' because of Firefox and arguments.caller.callee ###
  'use strict'

  ### initialize new object ###
  Ʃ = (obj) ->
    return new Ʃ.fn.init obj

  ### functions that should use the selected jQuery DOM object ###
  Ʃ.fn = Ʃ.prototype =
    init: (obj) ->
      @obj = $ obj
      @
    firstChild: ->
      @obj = @obj.children(':first')
    getActive: ->
      @obj = @obj.find('.active')

  Ʃ.fn.init.prototype = Ʃ.fn

  ### some helper function ###
  $.extend Ʃ, {
    isArray : (object) ->
      $.isArray object
  }

  ### set global function ###
  window.Ʃ = Ʃ
) window.jQuery, window

###*
 * Now u can use Ʃ like the jQuery function
###

myDomObject = window.Ʃ('#selector')
myDomObject.firstChild().getActive()
