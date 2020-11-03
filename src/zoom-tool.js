import sketch from 'sketch/dom'
import analytics from '@ozgurgunes/sketch-plugin-analytics'
import { showMessage, alert, textField } from '@ozgurgunes/sketch-plugin-ui'

var doc = sketch.getSelectedDocument()
var zoomValue = Math.round(100 * doc.sketchObject.zoomValue()) / 100

export default function () {
  let value = getInput()
  setZoom(value)
  analytics()
  showMessage(value + '%')
}

function getInput(initial) {
  initial = initial || zoomValue * 100
  let buttons = ['Arrange', 'Cancel']
  let info = 'Zoom (%):'
  let accessory = textField(initial)
  let response = alert(info, buttons, accessory).runModal()
  let result = accessory.stringValue()
  if (response === 1000) {
    switch (true) {
      case !result.length() > 0:
        // User clicked "OK" without entering a value.
        // Return dialog until user enters anyting or clicks "Cancel".
        return getInput()
      case !Number(result):
        throw alert('Please enter numbers only.').runModal()
      default:
        return result
    }
  }
}

function setZoom(zoom) {
  let ratio = (zoomValue / Number(zoom)) * 100
  let viewRect = doc.sketchObject.contentDrawView().visibleContentRect()
  let targetRect = viewRect
  let centerX = viewRect.origin.x + viewRect.size.width / 2
  let centerY = viewRect.origin.y + viewRect.size.height / 2
  targetRect.size.width = viewRect.size.width * ratio
  targetRect.size.height = viewRect.size.height * ratio
  targetRect.origin.x = centerX - targetRect.size.width / 2
  targetRect.origin.y = centerY - targetRect.size.height / 2
  viewRect = targetRect
  if (zoom) {
    doc.sketchObject.contentDrawView().zoomToFitRect(targetRect)
  }
}
