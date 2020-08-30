import analytics from './analytics'
import * as UI from './ui'

const sidebar = {
  'hd': 256,
  'x-large': 256,
  'large': 240,
  'medium': 240,
  'small': 240,
}

const margin = {
  'hd': 56,
  'x-large': 56,
  'large': 44,
  'medium': 44,
  'small': 36,
}

const gutters = {
  'hd': 40,
  'x-large': 32,
  'large': 32,
  'medium': 24,
  'small': 24,
}

var rounded = false

export default context => {
  try {
    let doc = context.document
    let artboard = doc.currentPage().currentArtboard()

    if (artboard.frame().width() < 768 ) {
      throw UI.dialog('Artboard is too small for a sidebar.')
    }

    let columns = getInput()

    if (columns) {
      let container
      switch (true) {
        case (artboard.frame().width() >= 1920):
          container = 'hd'
          break
        case (artboard.frame().width() >= 1440 && artboard.frame().width() < 1920):
          container = 'x-large'
          break
        case (artboard.frame().width() >= 1280 && artboard.frame().width() < 1440):
          container = 'large'
          break
        case (artboard.frame().width() >= 1024 && artboard.frame().width() < 1280):
          container = 'medium'
          break
        case (artboard.frame().width() < 1024):
          container = 'small'
          break
      }

      let layout = calculateLayout(artboard, container, columns)
      artboard.setLayout(layout)
      artboard.layout().setIsEnabled(true)

      let ruler = artboard.horizontalRulerData()
      showRuler(doc)
      ruler.addGuideWithValue(sidebar[container])

      analytics(container + ' - ' + columns, 1)
      if (rounded) {
        UI.error('Layout set to ' + columns + ' columns with sub-pixels. Numbers are rounded!')        
      } else {
        UI.success('Layout set to ' + columns + ' columns with ' + sidebar[container] + 'px sidebar.')
      }
    }
  } catch (e) {
    if (e) {
      console.log(e)
      return e
    }
  }
}

const calculateLayout = (artboard, container, columns) => {
  let layout = MSLayoutGrid.alloc().init()
  let ruler = artboard.horizontalRulerData()

  clearGuides(ruler)

  layout.setNumberOfColumns(columns)
  layout.setGuttersOutside(false)

  let totalWidth = artboard.frame().width() - sidebar[container] - margin[container] * 2
  let columnWidth = (totalWidth - (columns - 1) * gutters[container]) / columns
  if (columnWidth % 1 != 0) {
    rounded = true
  }
  columnWidth = Math.round(columnWidth)
  let offset = sidebar[container] + margin[container]

  layout.setTotalWidth(totalWidth)
  layout.setGutterWidth(gutters[container])
  layout.setColumnWidth(columnWidth)
  layout.setHorizontalOffset(offset)

  return layout
}

const clearGuides = ruler => {
  if (ruler.numberOfGuides()) {
    ruler.removeGuideAtIndex(0)
    clearGuides(ruler)
  }
}

const getInput = columns => {
  columns = (columns) || 12
  let buttons = ['Set Layout', 'Cancel']
  let info = 'How many columns do you want?'
  let accessory = UI.textField(columns)
  let response = UI.dialog(info, accessory, buttons)
  let result = accessory.stringValue()
  if (response === 1000) {
    switch (true) {
      case (!result.length() > 0):
        // User clicked "OK" without entering a value.
        // Return dialog until user enters anyting or clicks "Cancel".
        return getInput()
      case (!Number(result) || result > 24):
        throw UI.dialog('Please enter a number 24 or less.')
      default:
        return result
    }
  }
}

const showRuler = document => {
  if (!document.isRulersVisible()) {
      let toggleRulersAction = document.actionsController().actionForID("MSToggleRulersAction");
      if(toggleRulersAction.validate()) {
          toggleRulersAction.performAction(nil);
      }
  }
}