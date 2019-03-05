import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import analytics from './analytics.js'

const scriptName = "Zoom Tool"

const doc = sketch.getSelectedDocument()
const zoomValue = Math.round(100 * doc.sketchObject.zoomValue())/100

export default function() {

  UI.getInputFromUser("Zoom (%):", 
    {initialValue: zoomValue*100,},
    (err, value) => {
      if (err) {
        // most likely the user canceled the input
        return
      }
      else if (!Number.isInteger(Number(value))) {
        // accept integer only
        var message = "Please enter numbers only."
        analytics(context, scriptName, message)
        UI.message("Zoom: " + message)  
      }
      else {
        setZoom(value)
        var message = value + "%"
        analytics(context, scriptName, message)
        UI.message("Zoom: " + message)  
      }
    }
  )

}

function setZoom(zoom){

	let ratio = zoomValue / Number(zoom)*100
	let viewRect = doc.sketchObject.contentDrawView().visibleContentRect()
	let targetRect = viewRect
  
	let centerX = viewRect.origin.x + (viewRect.size.width / 2)
	let centerY = viewRect.origin.y + (viewRect.size.height / 2)

	targetRect.size.width = viewRect.size.width*ratio
	targetRect.size.height = viewRect.size.height*ratio
	targetRect.origin.x = centerX - (targetRect.size.width/2)
	targetRect.origin.y = centerY - (targetRect.size.height/2)

	viewRect = targetRect

	if (zoom) {
    doc.sketchObject.contentDrawView().zoomToFitRect(targetRect)
	}

}
