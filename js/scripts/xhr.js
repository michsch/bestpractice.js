
/*
 * Cross Browser XML HTTP Request
 * https://stackoverflow.com/questions/2557247/easiest-way-to-retrieve-cross-browser-xmlhttprequest
 *
 * Gist: https://gist.github.com/michsch/acf8d51039e078f8fe07
 */

/* global
  ActiveXObject,
  define,
  exports
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
  var XMLHttpFactories, createXmlHttpObject, xhr;
  XMLHttpFactories = [
    function() {
      return new XMLHttpRequest();
    }, function() {
      return new ActiveXObject('Msxml2.XMLHTTP');
    }, function() {
      return new ActiveXObject('Msxml3.XMLHTTP');
    }, function() {
      return new ActiveXObject('Microsoft.XMLHTTP');
    }
  ];

  /**
   * Create the XML HTTP object
   *
   * @method createXmlHttpObject
   * @returns {Object} XML HTTP object
   */
  createXmlHttpObject = function() {
    var e, factory, xmlhttp, _i, _len;
    xmlhttp = false;
    for (_i = 0, _len = XMLHttpFactories.length; _i < _len; _i++) {
      factory = XMLHttpFactories[_i];
      try {
        xmlhttp = factory();
      } catch (_error) {
        e = _error;
        continue;
      }
      break;
    }
    return xmlhttp;
  };

  /**
   * The cross browser xhr function
   *
   * @method xhr
   * @param {String} url            The url for the XML HTTP request
   * @param {Function} [callback]   A callback function to call after a
   *                                successful request.
   * @param {Object} [postData]     Additional post data to send.
   * @returns void
   */
  xhr = function(url, callback, postData) {
    var method, req;
    req = createXmlHttpObject();
    if (!req || !url) {
      return;
    }
    method = postData ? 'POST' : 'GET';
    req.open(method, url, true);
    if (postData) {
      req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    req.onreadystatechange = function() {
      if (req.readyState !== 4) {
        return;
      }
      if (req.status !== 200 && req.status !== 304) {
        return;
      }
      callback(req);
    };
    if (req.readyState === 4) {
      return;
    }
    req.send(postData);
  };
  return xhr;
}, 'xhr');
