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
  let artboards = selection.layers.filter(layer =>
    [sketch.Types.Artboard, sketch.Types.SymbolMaster].includes(layer.type)
  )
  if (artboards.length < 1) {
    analytics('Selection Error')
    return errorMessage('Please select artboards.')
  }
  let value = getInput()
  if (!value) return
  increment(artboards, value)
  analytics('Artboards Sequenced', artboards.length)
  successMessage(artboards.length + ' artboards updated.')
}

function increment(artboards, value) {
  // convert selection to standard array
  artboards.forEach(artboard => {
    artboard.name = artboard.name.replace(/\d{2,}/, n => {
      let nn = Number(n) + Number(value)
      return ('0' + nn).slice(-n.length)
    })
  })
}

function getInput(initial) {
  initial = initial || 0
  let buttons = ['Sequence', 'Cancel']
  let info = 'Please enter increment / decrement value.'
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
