
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
  var root;
  root = (typeof window === 'object' && window) || this;
  if (typeof root.HTMLElement === 'function') {
    root.HTMLElement.prototype.insertAfter = function(newNode, referenceNode) {
      var singleChildNode, verifiedReferenceNode, _i, _len, _ref;
      _ref = this.childNodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        singleChildNode = _ref[_i];
        if (singleChildNode === referenceNode) {
          verifiedReferenceNode = true;
          this.insertBefore(newNode, referenceNode.nextSibling);
          return newNode;
        }
      }
      if (!verifiedReferenceNode) {
        throw new Error('Failed to execute \'insertAfter\' on \'Node\': The node before which the new node is to be inserted is not a child of this node.');
      }
    };
  }
  return function(newNode, referenceNode) {
    return referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  };
}, 'insertAfter');
