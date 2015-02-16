###
 * Cross Browser XML HTTP Request
 * https://stackoverflow.com/questions/2557247/easiest-way-to-retrieve-cross-browser-xmlhttprequest
 *
 * Gist: https://gist.github.com/michsch/acf8d51039e078f8fe07
###

### global
  ActiveXObject,
  define,
  exports
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

  XMLHttpFactories = [
    ->
      new XMLHttpRequest()
    ->
      new ActiveXObject('Msxml2.XMLHTTP')
    ->
      new ActiveXObject('Msxml3.XMLHTTP')
    ->
      new ActiveXObject('Microsoft.XMLHTTP')
  ]

  ###*
   * Create the XML HTTP object
   *
   * @method createXmlHttpObject
   * @returns {Object} XML HTTP object
  ###
  createXmlHttpObject = ->
    xmlhttp = false

    for factory in XMLHttpFactories
      try
        xmlhttp = factory()
      catch e
        continue
      break
    xmlhttp

  ###*
   * The cross browser xhr function
   *
   * @method xhr
   * @param {String} url            The url for the XML HTTP request
   * @param {Function} [callback]   A callback function to call after a
   *                                successful request.
   * @param {Object} [postData]     Additional post data to send.
   * @returns void
  ###
  xhr = (url, callback, postData) ->
    req = createXmlHttpObject()

    if !req or !url
      return

    method = if postData then 'POST' else 'GET'
    req.open method, url, true
    #req.setRequestHeader('User-Agent', 'XMLHTTP/1.0');

    if postData
      req.setRequestHeader 'Content-type', 'application/x-www-form-urlencoded'

    req.onreadystatechange = ->
      if req.readyState isnt 4
        return

      if req.status isnt 200 and req.status isnt 304
        #alert('HTTP error ' + req.status);
        return

      callback req
      return

    if req.readyState is 4
      return

    req.send postData
    return

  return xhr
, 'xhr'
