import UI from 'sketch/ui'
import analytics from './analytics.js'

const scriptName = 'Set Layout'
const app = NSApplication.sharedApplication

// const layout = MSLayoutGrid.alloc().init()

const types = ['Default', 'Sidebar', 'Banner', 'Combo']

const defaults = {
  'menuWidth': 256,
  'bannerWidth': 304,
  'marginWidth': 24,
  'guttersOutside': false
}
const screens = {
  'large': 1120,
  'desktop': 936,
  'tablet': 700,
  'mobile': 288
}
const columns = {
  'large': 12,
  'desktop': 12,
  'tablet': 12,
  'mobile': 12
}
const gutter = {
  'large': 32,
  'desktop': 24,
  'tablet': 20,
  'mobile': 12
}

// Handler function for "makeGrid"
export default function (context) {
  let doc = context.document
  let artboard = doc.currentPage().currentArtboard()
  let layoutType = createSelect('Grid Type', 'Please select a grid type.', types)

  if (layoutType) {
    let screenType
    switch (true) {
      case (artboard.frame().width() >= 1280):
        screenType = 'large'
        break
      case (artboard.frame().width() >= 1024 && artboard.frame().width() < 1280):
        screenType = 'desktop'
        break
      case (artboard.frame().width() >= 768 && artboard.frame().width() < 1024):
        screenType = 'tablet'
        break
      case (artboard.frame().width() <= 480):
        screenType = 'mobile'
        break
    }

    let layout = calculateLayout(artboard, screenType, layoutType)
    artboard.setLayout(layout)

    var message = layoutType + ' - ' + screens
    analytics(scriptName, message)
    UI.message(scriptName + ': ' + message)
  }
}

function calculateLayout (artboard, screenType, layoutType) {
  var layout = MSLayoutGrid.alloc().init()
  var ruler = artboard.horizontalRulerData()

  layout.setGutterWidth(gutter[screenType])
  layout.setNumberOfColumns(columns[screenType])
  layout.setGuttersOutside(defaults['guttersOutside'])

  var offset = (artboard.frame().width() - screens[screenType]) / 2
  var totalWidth = screens[screenType]

  clearGuides(ruler)

  if (layoutType == 'Sidebar' || layoutType == 'Combo') {
    ruler.addGuideWithValue(offset)
    ruler.addGuideWithValue(offset + defaults['menuWidth'])
    offset += defaults['menuWidth'] + defaults['marginWidth']
    totalWidth -= defaults['menuWidth'] + defaults['marginWidth']
  }
  if (layoutType == 'Banner' || layoutType == 'Combo') {
    totalWidth -= defaults['bannerWidth'] + defaults['marginWidth']
    ruler.addGuideWithValue(offset + totalWidth + defaults['marginWidth'])
    ruler.addGuideWithValue(offset + totalWidth + defaults['marginWidth'] + defaults['bannerWidth'])
  }

  var columnWidth = (totalWidth - (columns[screenType] - 1) * gutter[screenType]) / columns[screenType]

  layout.setTotalWidth(totalWidth)
  layout.setHorizontalOffset(offset)
  layout.setColumnWidth(columnWidth)

  return layout
}

function clearGuides (ruler) {
  if (ruler.numberOfGuides()) {
    ruler.removeGuideAtIndex(0)
    clearGuides(ruler)
  }
}

function createDialog (message, info, accessory, buttons) {
  buttons = buttons || ['OK', 'Cancel']
  var alert = NSAlert.alloc().init()
  alert.setMessageText(message)
  alert.setInformativeText(info)
  buttons.forEach(function (data) {
    alert.addButtonWithTitle(data)
  })
  if (accessory) {
    alert.setAccessoryView(accessory)
    // alert.window.setInitialFirstResponder(accessory);
  }
  return alert.runModal()
}

function createSelect (msg, info, items, selectedItemIndex) {
  if (items.length < 1) {
    return app.displayDialog('No type defined')
  }
  selectedItemIndex = selectedItemIndex || 0
  var accessory = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0, 0, 240, 25))
  accessory.addItemsWithTitles(items)
  accessory.selectItemAtIndex(selectedItemIndex)

  var response = createDialog(msg, info, accessory)
  var result = accessory.titleOfSelectedItem()
  if (response === 1000) {
    return result
  }
}
