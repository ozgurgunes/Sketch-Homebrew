import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

const doc = sketch.getSelectedDocument()
const zoomValue = Math.round(100 * doc.sketchObject.zoomValue())/100

export default function() {

  sketch.UI.getInputFromUser("Zoom (%):", 
    {initialValue: zoomValue*100,},
    (err, value) => {
      if (err) {
        // most likely the user canceled the input
        return
      }
      else if (!Number.isInteger(Number(value))) {
        // accept integer only
        sketch.UI.message("Please enter numbers only.")
      }
      else {
        setZoom(value)
        sketch.UI.message("Zoom: " + value + "%")
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
