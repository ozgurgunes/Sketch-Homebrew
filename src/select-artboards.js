import sketch from 'sketch/dom'
import * as UI from './ui.js'
import analytics from './analytics.js'

var doc = sketch.getSelectedDocument()

export default () => {

  let artboards = doc.selectedPage.layers.filter(layer => {
    return layer.type == sketch.Types.Artboard
  })

  doc.selectedLayers.clear()
  artboards.map(artboard => {
    if (!artboard.name.startsWith("- Cover") &&
        !artboard.name.startsWith("-Cover") &&
        !artboard.name.startsWith("Cover:")) {
    artboard.sketchObject.select_byExtendingSelection(1, 1)    
    }
  })
  let count = doc.selectedLayers.length
  analytics('Artboards Selected', count)
  return UI.message(`${count} layer${plural} artboards selected.`, 'success')  
}
