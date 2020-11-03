import sketch from 'sketch/dom'
import analytics from '@ozgurgunes/sketch-plugin-analytics'
import { errorMessage, successMessage } from '@ozgurgunes/sketch-plugin-ui'

export default function() {
  try {
    let doc = sketch.getSelectedDocument()
    let symbols = doc.selectedLayers.layers.filter(
      layer => layer.type == sketch.Types.SymbolInstance
    )
    if (symbols.length < 1) {
      analytics('Selection Error')
      throw errorMessage('Please select symbols!')
    }
    let c = 0
    symbols.map(symbol => {
      symbol.overrides
        .filter(o => o.property == 'stringValue' && o.editable)
        .map(override => {
          symbol.setOverrideValue(override, override.value)
          c++
        })
    })
    analytics('Done', c)
    successMessage(
      c + ' overrides in ' + symbols.length + ' symbols populated.'
    )
  } catch (e) {
    console.log(e)
    return e
  }
}
