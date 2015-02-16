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

  (url, callback) ->
    cache = Math.round (new Date()).getTime() / 1000
    script = document.createElement 'script'
    script.async = true
    script.src = url + '?' + cache

    # Define callback
    if typeof script.addEventListener == 'function'
      script.addEventListener 'load', ->
        callback()

    else if (typeof script.onload == 'object') 
      script.onload = callback
    else if script.onreadystatechange?
      script.onreadystatechange = ->
        if this.readyState == 'complete'
          callback()

    document.body.appendChild script

, 'loadScript'
