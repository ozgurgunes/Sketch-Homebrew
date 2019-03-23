import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import analytics from './analytics.js'

var doc = sketch.getSelectedDocument()
var zoomValue = Math.round(100 * doc.sketchObject.zoomValue()) / 100

export default context => {
  analytics('Done', 1)
  UI.message('Zoom: ' + zoomValue * 100 + '%')
}
