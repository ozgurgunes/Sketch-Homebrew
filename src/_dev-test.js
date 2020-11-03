import {
  slider,
  alert,
  errorMessage,
  successMessage
} from "@ozgurgunes/sketch-plugin-ui"

export default function() {
  var buttons = ["OK", "Cancel"]
  var info = "Please type or pick something in the combo box."
  var options = ["An option", "Another option"]
  var accessory = slider({minValue: 1, maxValue: 10, initialValue: 5})
  let dialog = alert(info, buttons, accessory)
  console.log(dialog.customvar)
  var response = dialog.runSheet()
  //var response = showSheet(dialog)
  var result = accessory.stringValue()
  if (response === 1000) {
    if (!result.length() > 0) {
      // User clicked "OK" without entering anything.
      errorMessage("You didn't enter anything.")
    } else {
      successMessage('You entered "' + result + '"')
    }
  }
}

function test2() {
  //test()
  var buttons = ['Select', 'Cancel', 'Select All']
  var info = 'Please select options.'
  var options = [
    'An option',
    'Another option',
    'Another option 2',
    'An option',
    'Another option',
    'Another option 2',
    'An option',
    'Another option',
    'Another option 2',
    'Another option 22'
  ]
  var list = optionList(options)
  var accessory = NSView.alloc().init()
  var label = inputLabel('Test labelgg', null, null, true)
  var scroll = scrollView(list.view, NSMakeRect(0, 24, 320, 120))
  accessory.addSubview(label)
  accessory.addSubview(scroll)
  accessory.frame = NSMakeRect(0, 0, 320, 120)
  accessory.setFlipped(true)
  var response = alert(info, accessory, buttons).runModal()
  if (response === 1002) {
    // User clicked to "Select All".
    // Get a confirmation before selecting all.
    var message = 'Are you sure?'
    info = 'All options will be deleted!'
    buttons = ['Select All', 'Cancel']
    var confirmed = showSheet(alert(info, null, buttons, message))
    if (confirmed === 1000) {
      // User is sure to select all.
      list.options.map(option => option.setState(true))
      successMessage('All ' + options.length + ' option selected.')
    }
  }
  if (response === 1000) {
    if (list.getSelection().length == 0) {
      // User clicked to "Select" button, without selecting any option.
      errorMessage('Nothing selected.')
    } else {
      successMessage(list.getSelection().length + ' options selected.')
    }
  }
}

function test() {
  //let options = { message: 'test message', checkboxLabel: 'check', buttons: ['OK', 'Cancel', 'All'] }
  //console.log(dialog2.showMessageBox(document, options))

  let buttons = buttons || ['OK']
  let title = context.command.name()
  let info = 'Dialog info.'
  let accessory = comboBox(['ad', 'asdsda'])
  console.log(accessory)
  var alert = NSAlert.alloc().init()
  alert.setMessageText(title)
  alert.setInformativeText(info)
  buttons.map(button => alert.addButtonWithTitle(button))
  if (context.plugin.alertIcon()) {
    alert.icon = context.plugin.alertIcon()
  }
  if (accessory) {
    alert.setAccessoryView(accessory)
    if (!accessory.isMemberOfClass(NSTextView)) {
      alert.window().setInitialFirstResponder(accessory)
    }
  }
  alert.beginSheetModalForWindow_completionHandler(
    window,
    __mocha__.createBlock_function('v16@?0q8', function onCompletion(
      _returnCode
    ) {
      NSApp.stopModalWithCode(_returnCode)
    })
  )
  let response = NSApp.runModalForWindow(window)
  NSApp.endSheet(alert)

  let result = accessory.stringValue()
  if (response === 1000) {
    if (!result.length() > 0) {
      // User clicked "OK" without entering anything.
      message("You didn't enter anything.")
    } else {
      message('You entered "' + result + '"')
    }
  }
}
