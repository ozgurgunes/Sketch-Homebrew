import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import analytics from './analytics.js'

const scriptName = 'Sequence Artboards'

var selection = sketch.getSelectedDocument().selectedLayers

const getArtboards = () => {
  let artboards = selection.layers
    .filter(layer => [sketch.Types.Artboard, sketch.Types.SymbolMaster].includes(layer.type))
  if (artboards.length < 1) {
    analytics('Selection Error')
    message = 'Please select artboards.'
    UI.message(scriptName + ': ' + message)
  } else {
    return artboards
  }
}

export default context => {
  try {
    let artboards = getArtboards()
    let message
    UI.getInputFromUser('Increment:',
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
          increment(artboards, value)
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

function increment (artboards, value) {
  // convert selection to standard array
  selection.forEach(artboard => {
    artboard.name = artboard.name
    .replace(/\d{2,}/, (n) => { 
      let nn = (Number(n) + Number(value))
      return(('0' + nn).slice(-n.length))
    })
  })
}
