import sketch from 'sketch/dom'
import analytics from './analytics.js'
import * as UI from './ui.js'

export default context => {
  try {
    let doc = sketch.getSelectedDocument()
    let symbols = doc.selectedLayers.layers
      .filter(layer => layer.type == sketch.Types.SymbolInstance)
    if (symbols.length < 1) {
      analytics('Selection Error')
      throw UI.error('Please select symbols!')
    }
    let c = 0
    symbols.map(symbol => {
      symbol.overrides
        .filter(override => override.property == 'stringValue')
        .map(override => {
          symbol.setOverrideValue(override, override.value)
          c++
        })
    })
    analytics('Done', c)
    UI.success(c + ' overrides in ' + symbols.length + ' symbols populated.')
  } catch (e) {
    console.log(e)
    return e
  }
}
