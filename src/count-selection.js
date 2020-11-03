import sketch from 'sketch/dom'
import analytics from '@ozgurgunes/sketch-plugin-analytics'
import { errorMessage, successMessage } from '@ozgurgunes/sketch-plugin-ui'

var doc = sketch.getSelectedDocument()

export default function() {
  let count = doc.selectedLayers.length
  if (count < 1) {
    analytics('No Selection')
    throw errorMessage("You don't have any selection.")
  }
  let plural = count == 1 ? '' : 's'
  analytics('Count', count)
  return successMessage(`${count} layer${plural} selected.`, 'success')
}
