import analytics from './analytics'
import * as UI from './ui'

const containers = {
  'large': 1168,
  'desktop': 936,
  'tablet': 720,
  'mobile': 288
}

const gutters = {
  'large': 32,
  'desktop': 24,
  'tablet': 20,
  'mobile': 12
}

export default context => {
  try {
    let doc = context.document
    let artboard = doc.currentPage().currentArtboard()
    let columns = getInput()

    if (columns) {
      let container
      switch (true) {
        case (artboard.frame().width() >= 1280):
          container = 'large'
          break
        case (artboard.frame().width() >= 1024 && artboard.frame().width() < 1280):
          container = 'desktop'
          break
        case (artboard.frame().width() >= 768 && artboard.frame().width() < 1024):
          container = 'tablet'
          break
        case (artboard.frame().width() < 768):
          container = 'mobile'
          break
      }

      let layout = calculateLayout(artboard, container, columns)
      artboard.setLayout(layout)
      artboard.layout().setIsEnabled(true)

      analytics(container + ' - ' + columns, 1)
      UI.success('Layout set to ' + columns + ' columns.')
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

  layout.setGutterWidth(gutters[container])
  layout.setNumberOfColumns(columns)
  layout.setGuttersOutside(false)

  let totalWidth = containers[container]
  let columnWidth = (totalWidth - (columns - 1) * gutters[container]) / columns
  let offset = (artboard.frame().width() - totalWidth) / 2

  layout.setTotalWidth(totalWidth)
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
    if (!result.length() > 0) {
      // User clicked "OK" without entering a name.
      // Return dialog until user enters a name or clicks "Cancel".
      return getInput()
    }
    if ([7, 11, 13, 14].includes(Number(result)) || result > 16) {
      throw UI.dialog('Can not be set to ' + result + ' columns.')
    }
    return result
  }
}
