import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import analytics from './analytics.js'

const scriptName = 'Space Horizontally'

export default function (context) {
  const doc = sketch.getSelectedDocument()
  const selection = doc.selectedLayers
  var message

  if (selection.length <= 1) {
    message = 'Please select at least 2 layers.'
    analytics(context, scriptName, message)
    UI.message(scriptName + ': ' + message)
  } else {
    UI.getInputFromUser('Horizontal Spacing (px):',
      {
        initialValue: 0
      },
      (err, value) => {
        if (err) {
          // most likely the user canceled the input

        } else if (!Number.isInteger(Number(value))) {
          // accept integer only
          message = 'Please enter numbers only.'
          analytics(context, scriptName, message)
          UI.message(scriptName + ': ' + message)
        } else {
          setSpacing(selection, value)
          message = value + ' px'
          analytics(context, scriptName, message)
          UI.message(scriptName + ': ' + message)
        }
      }
    )
  }
}

function setSpacing (selection, value) {
  var elements = []
  var left = 0
  var count = 0

  // convert selection to standard array
  selection.forEach(layer => {
    elements.push(layer)
  })

  // sort layers by vertical positions
  elements.sort(function (a, b) {
    return a.frame.x - b.frame.x
  })

  elements.forEach(layer => {
    left = count > 0 ? left : layer.frame.x
    layer.frame.x = left
    left += layer.frame.width + Number(value)
    count++
  })
}
