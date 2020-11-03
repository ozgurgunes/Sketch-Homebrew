/* eslint-disable */
import sketch from 'sketch/dom'
import settings from 'sketch/settings'

const PLUGIN = context.plugin.name()
const COMMAND = context.command.name()

// console.log("")
// console.log("########################################")
// console.log("#####  SKETCH  #####")
// console.log("########################################")
// console.log("%o", sketch)

// var alert = NSAlert.alloc().init()
// var accessory = NSComboBox.alloc().initWithFrame(NSMakeRect(0, 0, 240, 25))
// accessory.addItemsWithObjectValues(["Item"])
// accessory.setEditable(true)
// accessory.setCompletes(true)

// var accessory = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0, 0, 240, 25))
// accessory.addItemsWithTitles(["Item"])
// accessory.selectItemAtIndex(0)

// var buttons = ['Save', 'Cancel']
// buttons.map(data => alert.addButtonWithTitle(data))

// alert.setAccessoryView(accessory)
// alert.window().setInitialFirstResponder(accessory)
// alert.runModal()

var doc = sketch.getSelectedDocument()
var libraries = sketch.getLibraries()
var selection = doc.selectedLayers

function randomDate(start, end) {
  start = start || new Date()
  end = end || new Date(new Date().setFullYear(new Date().getFullYear() - 1))
  let range = end.getTime() - start.getTime()
  return new Date(Math.random() * range + start.getTime())
}

export default function(context) {
  var options = {
    weekday: 'long', // long, short, narrow
    year: 'numeric', // numeric, 2-digit
    month: 'long', // numeric, 2-digit, long, short, narrow
    day: 'numeric', // numeric, 2-digit
    hour: 'numeric', // numeric, 2-digit
    minute: 'numeric', // numeric, 2-digit
    //second: 'numeric', // numeric, 2-digit
    hour12: false
  }
  console.log(randomDate().toLocaleDateString('tr-TR', options))
}

function systemLog(context) {
  if (symbol) {
    libImportableSymbols(symbol.master.getLibrary())
    console.log('%s', '')
    symbolOverrides(symbol)
    console.log('%s', '')
  } else {
    // docSymbols(doc)
    // console.log("%s", "")
    docTextStyles(doc)
    console.log('%s', '')
    docLayerStyles(doc)
    console.log('%s', '')
  }
}

function uncheckOverrides(symbol) {
  symbol.overrides.forEach(override => {
    console.log('########################################')
    console.log("'NAME': %o", override.affectedLayer.name)
    console.log('%o', override.affectedLayer)
    override.editable = !override.affectedLayer.locked
  })
}

function symbolOverrides(symbol) {
  console.log('########################################')
  console.log('#####  SYMBOL OVERRIDES  #####')
  console.log('########################################')
  console.log("'SYMBOL': %o", symbol.name)
  symbol.overrides.forEach(override => {
    console.log('########################################')
    console.log("'NAME': %o", override.affectedLayer.name)
    console.log("'PROPERTY': %o", override.property.toUpperCase())
    console.log("'VALUE': %o", override.value)
    console.log('%o', override)
  })
}

function libImportableSymbols(library) {
  console.log('########################################')
  console.log('#####  IMPORTABLE SYMBOLS  #####')
  console.log('########################################')
  if (library) {
    console.log("'LIBRARY': %o", library.name)
    library
      .getImportableSymbolReferencesForDocument(doc)
      .forEach(importable => {
        console.log('########################################')
        console.log("'NAME': %o", importable.name)
        console.log("'TYPE': %o", importable.objectType)
        console.log("'ID': %o", importable.id)
        // console.log("%o", override)
      })
  }
}

function libImportableTextStyles(library) {
  console.log('########################################')
  console.log('#####  IMPORTABLE TEXT STYLES  #####')
  console.log('########################################')
  if (library) {
    console.log("'LIBRARY': %o", library.name)
    library
      .getImportableTextStyleReferencesForDocument(doc)
      .forEach(importable => {
        console.log('%s', '')
        console.log('########################################')
        console.log("'NAME': %o", importable.name)
        console.log("'TYPE': %o", importable.objectType)
        console.log("'ID': %o", importable.id)
        // console.log("%o", override)
      })
  }
}

function libImportableLayerStyles(library) {
  console.log('########################################')
  console.log('#####  IMPORTABLE LAYER STYLES  #####')
  console.log('########################################')
  if (library) {
    console.log("'LIBRARY': %o", library.name)
    library
      .getImportableLayerStyleReferencesForDocument(doc)
      .forEach(importable => {
        console.log('%s', '')
        console.log('########################################')
        console.log("'NAME': %o", importable.name)
        console.log("'TYPE': %o", importable.objectType)
        console.log("'ID': %o", importable.id)
        // console.log("%o", override)
      })
  }
}

function docSymbols(document) {
  console.log('########################################')
  console.log('#####  SYMBOLS  #####')
  console.log('########################################')
  document.getSymbols().forEach(symbol => {
    console.log('%s', '')
    console.log('%o', symbol.name.toUpperCase())
    console.log('########################################')
    console.log("'ID': %o", symbol.id)
    console.log("'SYMBOL ID': %o", symbol.symbolId)
    // console.log("%o", symbol)
  })
}

function docTextStyles(document) {
  console.log('########################################')
  console.log('#####  TEXT STYLES  #####')
  console.log('########################################')
  document.sharedTextStyles.forEach(style => {
    console.log('%s', '')
    console.log('%o', style.name.toUpperCase())
    console.log('########################################')
    console.log("'ID': %o", style.id)
    // console.log("%o", style)
  })
}

function docLayerStyles(document) {
  console.log('########################################')
  console.log('#####  LAYER STYLES  #####')
  console.log('########################################')
  document.sharedLayerStyles.forEach(style => {
    console.log('%s', '')
    console.log('%o', style.name.toUpperCase())
    console.log('########################################')
    console.log("'ID': %o", style.id)
    // console.log("%o", style)
  })
}
