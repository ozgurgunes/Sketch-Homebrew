import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import analytics from './analytics.js'

const scriptName = 'Sequence Artboards'

var selection = sketch.getSelectedDocument().selectedLayers

function getArtboards() {
  let artboards = selection.layers.filter(layer =>
    [sketch.Types.Artboard, sketch.Types.SymbolMaster].includes(layer.type)
  )
  if (artboards.length < 1) {
    analytics('Selection Error')
    UI.message(scriptName + ': ' + 'Please select artboards.')
  } else {
    return artboards
  }
}

export default function() {
  try {
    let artboards = getArtboards()
    let message
    UI.getInputFromUser(
      'Increment:',
      {
        initialValue: 0
      },
      (err, value) => {
        if (err) {
          // most likely the user canceled the input
        } else if (!Number.isInteger(Number(value))) {
          // accept integer only
          message = 'Please enter numbers only.'
          analytics(scriptName)
          UI.message(scriptName + ': ' + message)
        } else {
          increment(value)
          message = artboards.length + ' artboards updated.'
          analytics(scriptName, artboards.length)
          UI.message(scriptName + ': ' + message)
        }
      }
    )
  } catch (e) {
    console.log(e)
    return e
  }
}

function increment(value) {
  // convert selection to standard array
  selection.forEach(artboard => {
    artboard.name = artboard.name.replace(/\d{2,}/, n => {
      let nn = Number(n) + Number(value)
      return ('0' + nn).slice(-n.length)
    })
  })
}
