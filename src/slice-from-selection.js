import sketch from 'sketch/dom'
import * as UI from './ui.js'
import analytics from './analytics.js'

var doc = context.document;
var selection = context.selection
var handler = context.document.eventHandlerManager().normalHandler()
var rect = handler.selectedRect()

export default () => {

    if (selection.count() == 0) {
        analytics('No Selection')
        throw UI.message("You don't have any selection.", 'error')
    }

    let offset = getInput()

    var slice = MSSliceLayer.alloc().init()

    slice.setFrame(MSRect.alloc().initWithRect(rect));

    if (offset) {
        slice.frame().setX(rect.origin.x - offset)
        slice.frame().setY(rect.origin.y - offset)
        slice.frame().setWidth(rect.size.width + offset * 2)
        slice.frame().setHeight(rect.size.height + offset * 2)    

        slice.exportOptions().setExportFormats(MSExportPreset.allExportPresets()[0].exportFormats());

        doc.currentPage().addLayers([slice])

        doc.currentPage().changeSelectionBySelectingLayers([slice]);

        analytics('Slice Created', 1)
        return UI.message('Slice created', 'success')  
    }

}

const getInput = () => {
    let offset = "0"
    let buttons = ['Set Offset', 'Cancel']
    let info = 'Please specify the offset of the slice.'
    let accessory = UI.textField(offset)
    let response = UI.dialog(info, accessory, buttons)
    let result = accessory.stringValue()
    if (response === 1000) {
      switch (true) {
        case (!Number.isInteger(Number(result)) || result < 0):
            UI.message('Please enter a number 0 or greater.', 'error')
            return getInput()            
        default:
          return result
      }
    }
  }
  