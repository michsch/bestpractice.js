###*
 * Use a JavaScript object as module
 *
 * pros:
 *   - easy to understand (inside the object Ʃ "this" is always the object itself)
 *   - namespacing for some functions
 *   - good for some helper functions (see underscore.js)
 *   - easy to extend with more functions or vars (objects, strings, numbers)
 *   - just use one global var (Ʃ)
 *
 * cons:
 *   - no multiple instances
 *   - no private methods
 *   - no 
###

(($, window) ->
  'use strict'

  Ʃ =
    init: ->
      @hideBody()
      true
    hideBody: ->
      $('body').hide()

  ### set as global var ###
  window.Ʃ = Ʃ
) window.jQuery, window

###*
 * Now we have this 2 functions available in the object window.Ʃ:
 *
 * window.Ʃ.init()
 * window.Ʃ.hideBody()
###
### this will hide the body ###
window.Ʃ.init()

###*
 * The same with the possibility to extend itself
 *
 * If Ʃ is already defined, the Ʃ object will be given to the IIFE,
 * so it can be extended inside (exports = window.Ʃ).
 *
###
window.Ʃ = ((exports, $, window) ->
  'use strict'

  exports.hideNav = ->
    $('nav').hide()

  exports.hideSidebar = ->
    $('aside').hide()

  ###
   * Don't use something like this inside the IIFE, because you would overwrite the
   * already defined Ʃ object:

  exports = {
    hideNav : function() {
      ...
    },
    hideSidebar : function() {
      ...
    }
  };
  ###

  ###
   * If jQuery is available, you can use the jQuery.extend function.
  ###
  $.extend exports, {
    oneMoreThing: ->
      true
  }

  ### return the full exports object ###
  exports
) window.Ʃ || {}, window.jQuery, window

###*
 * Now we have 4 functions available in the object window.Ʃ:
 *
 * window.Ʃ.init()
 * window.Ʃ.hideBody()
 * window.Ʃ.hideNav()
 * window.Ʃ.hideSidebar()
###

window.Ʃ.hideNav()
window.Ʃ.hideSidebar()
window.Ʃ.oneMoreThing()
