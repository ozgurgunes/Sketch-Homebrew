import analytics from '@ozgurgunes/sketch-plugin-analytics'
import {
  errorMessage,
  successMessage,
  alert,
  textField
} from '@ozgurgunes/sketch-plugin-ui'

const containers = {
  hd: 1216,
  xLarge: 1216,
  large: 1216,
  medium: 936,
  small: 744,
  iPhonePlus: 382,
  iPhone: 344,
  xSmall: 328,
  iPhone5: 288
}

const gutters = {
  hd: 40,
  xLarge: 32,
  large: 32,
  medium: 24,
  small: 24,
  iPhonePlus: 14,
  iPhone: 16,
  xSmall: 8,
  iPhone5: 12
}

var rounded = false

export default function(context) {
  try {
    let doc = context.document
    let artboard = doc.currentPage().currentArtboard()
    let columns = getInput()

    if (columns) {
      let container
      switch (true) {
        case artboard.frame().width() >= 1920:
          container = 'hd'
          break
        case artboard.frame().width() >= 1440 &&
          artboard.frame().width() < 1920:
          container = 'xLarge'
          break
        case artboard.frame().width() >= 1280 &&
          artboard.frame().width() < 1440:
          container = 'large'
          break
        case artboard.frame().width() >= 1024 &&
          artboard.frame().width() < 1280:
          container = 'medium'
          break
        case artboard.frame().width() >= 768 && artboard.frame().width() < 1024:
          container = 'small'
          break
        case artboard.frame().width() >= 414 && artboard.frame().width() < 768:
          container = 'iPhonePlus'
          break
        case artboard.frame().width() >= 375 && artboard.frame().width() < 414:
          container = 'iPhone'
          break
        case artboard.frame().width() >= 360 && artboard.frame().width() < 375:
          container = 'xSmall'
          break
        case artboard.frame().width() < 360:
          container = 'iPhone5'
          break
      }

      let layout = calculateLayout(artboard, container, columns)
      artboard.setLayout(layout)
      artboard.layout().setIsEnabled(true)

      analytics(container + ' - ' + columns, 1)
      if (rounded) {
        errorMessage(
          'Layout set to ' +
            columns +
            ' columns with sub-pixels. Numbers are rounded!'
        )
      } else {
        successMessage('Layout set to ' + columns + ' columns.')
      }
    }
  } catch (e) {
    if (e) {
      console.log(e)
      return e
    }
  }
}

function calculateLayout(artboard, container, columns) {
  let layout = MSLayoutGrid.alloc().init()
  let ruler = artboard.horizontalRulerData()

  clearGuides(ruler)

  layout.setNumberOfColumns(columns)
  layout.setGuttersOutside(false)

  let totalWidth = containers[container]
  let columnWidth = (totalWidth - (columns - 1) * gutters[container]) / columns
  if (columnWidth % 1 != 0) {
    rounded = true
  }
  columnWidth = Math.round(columnWidth)
  let offset = Math.round((artboard.frame().width() - totalWidth) / 2)

  layout.setTotalWidth(totalWidth)
  layout.setGutterWidth(gutters[container])
  layout.setColumnWidth(columnWidth)
  layout.setHorizontalOffset(offset)

  return layout
}

function clearGuides(ruler) {
  if (ruler.numberOfGuides()) {
    ruler.removeGuideAtIndex(0)
    clearGuides(ruler)
  }
}

function getInput(columns) {
  columns = columns || 12
  let buttons = ['Set Layout', 'Cancel']
  let info = 'How many columns do you want?'
  let accessory = textField(columns)
  let response = alert(info, buttons, accessory).runModal()
  let result = accessory.stringValue()
  if (response === 1000) {
    switch (true) {
      case !result.length() > 0:
        // User clicked "OK" without entering a value.
        // Return dialog until user enters anyting or clicks "Cancel".
        return getInput()
      case !Number(result) || result > 24:
        throw alert('Please enter a number 24 or less.').runModal()
      default:
        return result
    }
  }
}
