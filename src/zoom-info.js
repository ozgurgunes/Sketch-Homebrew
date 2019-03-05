import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import analytics from './analytics.js'

const scriptName = "Zoom Info"

const doc = sketch.getSelectedDocument()
const zoomValue = Math.round(100 * doc.sketchObject.zoomValue())/100

export default function() {
  var message = zoomValue*100 + "%"
  analytics(context, scriptName, message)
  UI.message("Zoom: " + message)  
}
