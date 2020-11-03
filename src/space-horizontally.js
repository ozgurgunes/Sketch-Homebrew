import sketch from 'sketch/dom'
import analytics from '@ozgurgunes/sketch-plugin-analytics'
import {
  errorMessage,
  successMessage,
  alert,
  textField,
} from '@ozgurgunes/sketch-plugin-ui'

export default function () {
  let selection = sketch.getSelectedDocument().selectedLayers

  if (selection.length <= 1) {
    analytics('Selection Error')
    return errorMessage('Please select at least 2 layers.')
  }
  let value = getInput()
  setSpacing(selection, value)
  analytics('Arranged', selection.length)
  successMessage(value + 'px')
}

function getInput(initial) {
  initial = initial || 0
  let buttons = ['Arrange', 'Cancel']
  let info = 'Horizontal Spacing (px):'
  let accessory = textField(initial)
  let response = alert(info, buttons, accessory).runModal()
  let result = accessory.stringValue()
  if (response === 1000) {
    switch (true) {
      case !result.length() > 0:
        // User clicked "OK" without entering a value.
        // Return dialog until user enters anyting or clicks "Cancel".
        return getInput()
      case !Number(result):
        throw alert('Please enter numbers only.').runModal()
      default:
        return result
    }
  }
}

function setSpacing(selection, value) {
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
