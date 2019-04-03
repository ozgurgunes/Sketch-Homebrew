import sketch from 'sketch/dom'
import analytics from './analytics.js'
import * as UI from './ui.js'

export default context => {
  try {
    let doc = sketch.getSelectedDocument()
    let symbols = doc.selectedLayers.layers
      .filter(layer => layer.type == sketch.Types.SymbolInstance)
    let overrides = context.document.documentData().selectedOverrides()
    if (symbols.length < 1) {
      analytics('Selection Error')
      throw UI.error('Please select symbols!')
    }
    let c = 0
    symbol.map(symbol => {
      for (let i = 0; i < overrides.length; i++) {
        let override = symbol.overrides
          .find(o => overrides[i] == symbol.id + '#' + o.id && o.property == 'symbolID')
        if (override) {
          symbol.setOverrideValue(override, '')
          c++
        }
      }
    })
    analytics('Done', c)
    UI.success(c + ' overrides in ' + symbols.length + ' symbols set to None.')
  } catch (e) {
    console.log(e)
    return e
  }
}
