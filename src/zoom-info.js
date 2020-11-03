import sketch from 'sketch/dom'
import analytics from '@ozgurgunes/sketch-plugin-analytics'
import { showMessage } from '@ozgurgunes/sketch-plugin-ui'

var doc = sketch.getSelectedDocument()
var zoomValue = Math.round(100 * doc.sketchObject.zoomValue()) / 100

export default function () {
  analytics()
  showMessage(zoomValue * 100 + '%')
}
