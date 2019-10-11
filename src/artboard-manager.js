import sketch from 'sketch/dom'
import settings from 'sketch/settings'
import UI from 'sketch/ui'

// Config
const config = {
  "gridHorizontalSpace": 100,
  "gridVerticalSpace": 200,
  "arrangeOnAdd": false,
  "renameArtboards": false,
  "artboardBasenames": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
  "arrangeSymbolsPage": false,
  "excludePattern": "--",
  "minimumIntegerDigits": 2,
  "arrangeSymbols": false,
}

const message = (status) => {
  let emoji = ''
  switch (status) {
    case false:
      emoji = '🚫   '
      break
    case true:
      emoji = '✅   '
      break
  }
  UI.message(emoji + 'Artboard Manager' + ': ' + (status ? "ON" : "OFF"))
}

export function toggleManager (context) {
  var setting = settings.settingForKey('artboard-manager-toggle')
  settings.setSettingForKey('artboard-manager-toggle', !!!setting)
  message(!!!setting)
}

export function ArtboardChanged(context) {
    // console.log("ArtboardChanged")
    // Called on
    // - Add
    // - Remove
    // - Duplicate
    // - Move
    // - Select
    // - Unselect
  
    // This function is called when an artboard is added, *and* when artboards are moved
    // so we need to somehow filter the event so that we don't end up arranging the artboards
    // twice after each move operation. By now, we'll just ignore the event…
    // console.log(context)
    // console.log(context.actionContext)
  }
  
export function ArrangeArtboards(context) {
  const doc = sketch.getSelectedDocument()
  const page = doc.selectedPage
  const symbolsPage = doc._object.documentData().symbolsPage()

  // Don't arrange Artboards if we’re on the Symbols page and the setting
  // is disabled
  if (page._object == symbolsPage && config.arrangeSymbolsPage == false) {
    return
  }

  var setting = !!settings.settingForKey('artboard-manager-toggle')
  if (!setting) {
    return
  }

  const originalSelection = doc.selectedLayers
  const artboards = doc.selectedPage.layers.filter(layer => (layer.type == 'Artboard')).filter(shouldArrangeArtboard)

  // This will be the starting point for our Artboard Grid
  const layoutX = artboards.reduce((initial, artboard) => {
    if (artboard.frame.x < initial) {
      initial = artboard.frame.x
    }
    return initial
  }, 10000000)
  const layoutY = artboards.reduce((initial, artboard) => {
    if (artboard.frame.y < initial) {
      initial = artboard.frame.y
    }
    return initial
  }, 10000000)

  // TODO: Maybe expose these options as a setting?
  // Dynamic snapping distance, based on Artboard size.
  // Use the average height of all Artboards. This works great with mixed Artboard sizes,
  // but there are minor issues if there are Artboards that are really tall
  var snapDistance = artboards.reduce((initial, artboard) => {
    initial += artboard.frame.height
    return initial
  },0) / artboards.length

  // Use the height of the tallest Artboard. Works for some layouts, but has issues with mixed Artboards sizes
  // var snapDistance = artboards.reduce((initial, artboard) => {
  //   if (artboard.frame.height > initial) {
  //     initial = artboard.frame.height
  //   }
  //   return initial
  // },0)

  // Original implementation, using a fixed value, which defaulted to 300
  // var snapDistance = config.snapDistance || 300

  // First, snap all Artboards to the grid, to group them by rows
  // They may overlap, but we'll fix that in a minute
  artboards.forEach(artboard => {
    artboard.frame.y = snapValueToGrid(artboard.frame.y, snapDistance)
  })

  var artboardRows = artboards.sort(sort_by_y_position).reduce((initial, artboard) => {
    initial.push(artboard.frame.y)
    return initial
  }, [])

  // Set X position for all Artboards on each row
  const artboardRowValues = [...new Set(artboardRows)]//.sort()
  var artboardY = layoutY
  var currentRow = 0
  artboardRowValues.forEach(rowValue => {
    var tallestArtboard = 0
    var artboardX = layoutX
    var artboardsInRow = artboards.filter(artboard => artboard.frame.y == rowValue)
    artboardsInRow.sort(sort_by_x_position).forEach((artboard, index) => {
      var currentColumn = index + 1
      artboard.frame.x = artboardX
      artboard.frame.y = artboardY
      artboardX += artboard.frame.width + config.gridHorizontalSpace
      if (artboard.frame.height > tallestArtboard) {
        tallestArtboard = artboard.frame.height
      }
      if (config.renameArtboards) {
        var artboard_name = config.artboardBasenames[currentRow] + currentColumn.toLocaleString('en-US', {minimumIntegerDigits: config.minimumIntegerDigits, useGrouping:false})
        // UI.message(artboard_name)
        UI.message(artboard_name)

        var pageObj = artboard.parent
        UI.message(pageObj.name)
        var pageName = pageObj.name.replace(" ","-")


        artboard.name = artboard_name+"_"+pageName
      }
    })
    artboardY += tallestArtboard + config.gridVerticalSpace
    currentRow++
  })

  // Update stacking
  artboards.sort(sort_by_x_position).sort(sort_by_y_position).forEach(artboard => {
    const parent = artboard.parent
    artboard.remove()
    parent._object.insertLayer_atIndex(artboard._object, 0)
  })

  // Restore original selection
  originalSelection.forEach(artboard => artboard.selected = true)

  // UI.message('Artboards arranged')
}

export function Duplicate(context) {
  // console.log('Duplicate')
  if (anArtboardIsSelected(context)) {
    ArrangeArtboards(context)
  }
}

export function LayersMoved (context) {
  // console.log("LayersMoved")
  const movedLayers = Array.from(context.actionContext.layers).map(layer => sketch.fromNative(layer))
  if (movedLayers.filter(layer => (layer.type == 'Artboard')).length > 0) {
    ArrangeArtboards(context)
  }
}

export function Resize(context){
  // console.log("Resize")
  // console.log(context)
  // console.log(context.actionContext)
  // "Normal" — User selected the Artboard tool to add an Artboard 🤔
  if (context.actionContext.name == "NormalResize" || context.actionContext.name == "NormalMultipleResize" || context.action == "ResizeArtboardToFit.finish") {
    if (anArtboardIsSelected(context)) {
      ArrangeArtboards(context)
    }
  }
  if (context.actionContext.name == "InsertArtboard" && config.arrangeOnAdd) {
    ArrangeArtboards(context)
  }
}

export function ResizeArtboardToFit(context){
  // console.log("ResizeArtboardToFit")
  Resize(context)
}

export function InsertArtboard(context){
  // console.log('InsertArtboard');
}

function shouldArrangeArtboard(artboard){
  return !artboard.name.startsWith(config.excludePattern)
}

const sort_by_x_position = function(a,b){
  return a.frame.x - b.frame.x
}

const sort_by_y_position = function(a,b) {
  return a.frame.y - b.frame.y
}  

function snapValueToGrid(value, grid) {
  var div = value/grid
  // Also snap down, so the Artboard doesn't jump to the row above if we're only 1 px above the snapping line
  var rest = div - Math.floor(div)
  if (rest > 0.8) {
    div += 1
  }
  return Math.floor(Math.floor(div) * grid)
}

const anArtboardIsSelected = function(context){
  // console.log("anArtboardIsSelected")
  const selectedLayers = sketch.getSelectedDocument().selectedLayers.layers
  return selectedLayers.filter(layer => (layer.type == 'Artboard')).length > 0
}
