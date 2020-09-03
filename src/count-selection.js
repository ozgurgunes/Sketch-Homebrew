import sketch from 'sketch/dom'
import * as UI from './ui.js'
import analytics from './analytics.js'

var doc = sketch.getSelectedDocument()

export default () => {
  let count = doc.selectedLayers.length
  if (count < 1) {
    analytics('No Selection')
    throw UI.message("You don't have any selection.", 'error')
  }
  let plural = count == 1 ? '' : 's'
  analytics('Count', count)
  return UI.message(`${count} layer${plural} selected.`, 'success')
}
