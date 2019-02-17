import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

const doc = sketch.getSelectedDocument()
const zoomValue = Math.round(100 * doc.sketchObject.zoomValue())/100

export default function() {
  sketch.UI.message("Zoom: " + zoomValue*100 + "%")
}
