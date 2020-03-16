import analytics from './analytics.js'
import * as UI from './ui.js'

export default context => {
  try {
    let symbols = context.document.currentPage().symbols()
    let symbolsLoop = symbols.objectEnumerator()
    let c = 0
    let symbol
    while ((symbol = symbolsLoop.nextObject())) {
      if (!symbol.hasInstances()) {
        symbol.select_byExtendingSelection(1, 1)
        c++
      }
    }
    analytics('Done', 1)
    UI.success(c + ' symbols selected.')
  } catch (e) {
    console.log(e)
    return UI.error('Something went wrong!')
  }
}
