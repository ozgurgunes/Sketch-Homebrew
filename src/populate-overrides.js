import sketch from 'sketch/dom'
import analytics from '@ozgurgunes/sketch-plugin-analytics'
import { errorMessage, successMessage } from '@ozgurgunes/sketch-plugin-ui'

export default function () {
  try {
    let symbols = sketch
      .getSelectedDocument()
      .selectedLayers.layers.filter(
        layer => layer.type == sketch.Types.SymbolInstance
      )

    if (symbols.length < 1) {
      analytics('Selection Error')
      return errorMessage('Please select symbols!')
    }

    let overrides = getSelectedOverrides()
    if (overrides.length > 0) {
      return populateOverrides(symbols, overrides)
    }

    return populateSymbols(symbols)
  } catch (e) {
    console.log(e)
    return e
  }
}

function populateOverrides(symbols, overrides) {
  let c = 0
  symbols.map(symbol => {
    for (let i = 0; i < overrides.length; i++) {
      let override = symbol.overrides.find(
        o =>
          overrides[i] == symbol.id + '#' + o.id &&
          o.property == 'stringValue' &&
          o.editable
      )
      if (override) {
        symbol.setOverrideValue(override, override.value)
        c++
      }
    }
  })
  analytics('Override', c)
  return successMessage(
    c + ' overrides in ' + symbols.length + ' symbols populated.'
  )
}

function populateSymbols(symbols) {
  let c = 0
  symbols.map(symbol => {
    symbol.overrides
      .filter(o => o.property == 'stringValue' && o.editable)
      .map(override => {
        symbol.setOverrideValue(override, override.value)
        c++
      })
  })
  analytics('Symbols', c)
  return successMessage(c + ' overrides in ' + symbols.length + ' symbols populated.')
}

function getSelectedOverrides() {
  return sketch
    .getSelectedDocument()
    .sketchObject.documentData()
    .selectedOverrides()
}
