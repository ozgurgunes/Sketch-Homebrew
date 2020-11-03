import analytics from '@ozgurgunes/sketch-plugin-analytics'
import { errorMessage, successMessage } from '@ozgurgunes/sketch-plugin-ui'

export default function(context) {
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
    successMessage(c + ' symbols selected.')
  } catch (e) {
    console.log(e)
    return errorMessage('Something went wrong!')
  }
}
