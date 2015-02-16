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

  root = (typeof window == 'object' and window) or @

  if typeof root.HTMLElement == 'function'
    root.HTMLElement.prototype.insertAfter = (newNode, referenceNode) ->
      for singleChildNode in this.childNodes
        if singleChildNode == referenceNode
          verifiedReferenceNode = true
          this.insertBefore(newNode, referenceNode.nextSibling)
          return newNode

      if !verifiedReferenceNode
        throw new Error 'Failed to execute \'insertAfter\' on \'Node\':
   The node before which the new node is to be inserted is not a child of
   this node.'

      return

  (newNode, referenceNode) ->
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)

, 'insertAfter'
