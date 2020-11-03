import settings from 'sketch/settings'
import analytics from '@ozgurgunes/sketch-plugin-analytics'
import { showMessage } from '@ozgurgunes/sketch-plugin-ui'

const prefString = 'tryToFitToPixelBounds'
const message = status => {
  let emoji = ''
  switch (status) {
    case false:
      emoji = '🚫   '
      break
    case true:
      emoji = '✅   '
      break
  }
  showMessage(emoji + 'Pixel Fitting' + ': ' + (status ? 'ON' : 'OFF'))
}

export default function() {
  let setting = settings.globalSettingForKey(prefString)
  if (typeof setting === 'undefined') {
    setting = 1
  }
  settings.setGlobalSettingForKey(prefString, !setting)
  analytics(!setting ? 'ON' : 'OFF', 1)
  message(!setting)
}
