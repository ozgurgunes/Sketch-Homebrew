import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import analytics from './analytics.js'

const scriptName = 'Space Vertically'

export default function() {
  const doc = sketch.getSelectedDocument()
  const selection = doc.selectedLayers
  var message

  if (selection.length <= 1) {
    message = 'Please select at least 2 layers.'
    analytics(scriptName, message)
    UI.message(scriptName + ': ' + message)
  } else {
    UI.getInputFromUser(
      'Vertical Spacing (px):',
      {
        initialValue: 0
      },
      (err, value) => {
        if (err) {
          // most likely the user canceled the input
        } else if (!Number.isInteger(Number(value))) {
          // accept integer only
          message = 'Please enter numbers only.'
          analytics(scriptName, message)
          UI.message(scriptName + ': ' + message)
        } else {
          setSpacing(selection, value)
          message = value + ' px'
          analytics(scriptName, message)
          UI.message(scriptName + ': ' + message)
        }
      }
    )
  }
}

function setSpacing(selection, value) {
  var elements = []
  var top = 0
  var count = 0

  // convert selection to standard array
  selection.forEach(layer => {
    elements.push(layer)
  })

  // sort layers by vertical positions
  elements.sort(function(a, b) {
    return a.frame.y - b.frame.y
  })

  elements.forEach(layer => {
    top = count > 0 ? top : layer.frame.y
    layer.frame.y = top
    top += layer.frame.height + Number(value)
    count++
  })
}
