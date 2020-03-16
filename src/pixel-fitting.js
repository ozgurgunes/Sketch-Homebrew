import settings from 'sketch/settings'
import UI from 'sketch/ui'
import analytics from './analytics.js'

const prefString = "tryToFitToPixelBounds"
const message = (status) => {
  let emoji = ''
  switch (status) {
    case false:
      emoji = '🚫   '
      break
    case true:
      emoji = '✅   '
      break
  }
  UI.message(emoji + 'Pixel Fitting' + ': ' + (status ? "ON" : "OFF"))
}

export default context => {
  let setting = settings.globalSettingForKey(prefString)
  if (typeof setting === 'undefined') {
    setting = 1
  }
  settings.setGlobalSettingForKey(prefString, !setting)
  analytics((!setting ? "ON" : "OFF"), 1)
  message(!setting)
}
