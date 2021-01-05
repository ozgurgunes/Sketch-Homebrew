import analytics from '@ozgurgunes/sketch-plugin-analytics'
import {
  errorMessage,
  successMessage,
  alert,
  textField,
} from '@ozgurgunes/sketch-plugin-ui'

var doc = context.document
var selection = context.selection
var handler = context.document.eventHandlerManager().normalHandler()
var rect = handler.selectedRect()

export default function () {
  if (selection.count() == 0) {
    analytics('No Selection')
    throw errorMessage("You don't have any selection.")
  }

  let offset = getInput()
  if (offset == null) return

  var slice = MSSliceLayer.alloc().init()
  slice.setFrame(MSRect.alloc().initWithRect(rect))
  slice.frame().setX(rect.origin.x - offset)
  slice.frame().setY(rect.origin.y - offset)
  slice.frame().setWidth(rect.size.width + offset * 2)
  slice.frame().setHeight(rect.size.height + offset * 2)
  slice
    .exportOptions()
    .setExportFormats(MSExportPreset.allExportPresets()[0].exportFormats())

  doc.currentPage().addLayers([slice])
  doc.currentPage().changeSelectionBySelectingLayers([slice])

  analytics('Slice Created', 1)
  return successMessage('Slice created')
}

function getInput() {
  let offset = '0'
  let buttons = ['Set Offset', 'Cancel']
  let info = 'Please specify the offset of the slice.'
  let accessory = textField(offset)
  let response = alert(info, buttons, accessory).runModal()
  let result = accessory.stringValue()
  if (response === 1000) {
    switch (true) {
      case !Number.isInteger(Number(result)) || result < 0:
        errorMessage('Please enter a number 0 or greater.')
        return getInput()
      default:
        return result
    }
  }
}
