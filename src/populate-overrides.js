import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import analytics from './analytics.js'

const scriptName = "Populate Overrides"

var doc = sketch.getSelectedDocument(),
  selection = doc.selectedLayers

export default function(context) {
  var message = "Done!"
  if (selection.length != 1 || selection.layers[0].type != sketch.Types.SymbolInstance) {
    message = "Please select a symbol instance."
    analytics(context, scriptName, message)
    UI.message(scriptName + ": " + message)
  } else {
    var symbol = selection.layers[0]
    symbol.overrides.map(override => {
      if (override.property == 'stringValue') {
        symbol.setOverrideValue(override, override.value)
      }
    })
    analytics(context, scriptName, message)
    UI.message(scriptName + ": " + message)
  }
}
