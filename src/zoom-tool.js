import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import analytics from './analytics.js'

var doc = sketch.getSelectedDocument()
var zoomValue = Math.round(100 * doc.sketchObject.zoomValue()) / 100

export default context => {
  UI.getInputFromUser('Zoom (%):',
    { initialValue: zoomValue * 100 },
    (err, value) => {
      if (err) {
        // most likely the user canceled the input

      } else if (!Number.isInteger(Number(value))) {
        // accept integer only
        var message = 'Please enter numbers only.'
        analytics('Fail')
        UI.message('Zoom: ' + message)
      } else {
        setZoom(value)
        analytics('Done', 1)
        UI.message('Zoom: ' + value + '%')
      }
    }
  )
}

const setZoom = zoom => {
  let ratio = zoomValue / Number(zoom) * 100
  let viewRect = doc.sketchObject.contentDrawView().visibleContentRect()
  let targetRect = viewRect
  let centerX = viewRect.origin.x + (viewRect.size.width / 2)
  let centerY = viewRect.origin.y + (viewRect.size.height / 2)
  targetRect.size.width = viewRect.size.width * ratio
  targetRect.size.height = viewRect.size.height * ratio
  targetRect.origin.x = centerX - (targetRect.size.width / 2)
  targetRect.origin.y = centerY - (targetRect.size.height / 2)
  viewRect = targetRect
  if (zoom) {
    doc.sketchObject.contentDrawView().zoomToFitRect(targetRect)
  }
}
