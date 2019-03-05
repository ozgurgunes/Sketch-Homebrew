import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import analytics from './analytics.js'

const scriptName = "Select Unused Symbols"

export default function(context) {

  var doc = context.document;
  var count = 0;
  var removedSymbolCount = 0;
  var symbols = context.document.currentPage().symbols();
  var symbolsLoop = symbols.objectEnumerator();
  var symbol;

  while (symbol = symbolsLoop.nextObject()) {
    if (!symbol.hasInstances()) {
      symbol.select_byExtendingSelection(1, 1)
      count++;
      removedSymbolCount++;
    }
  }
  var message = removedSymbolCount + "symbols removed"
  analytics(context, scriptName, message)
  UI.message(scriptName + ": " + message)

}
