import analytics from '@ozgurgunes/sketch-plugin-analytics'
import { errorMessage, successMessage } from '@ozgurgunes/sketch-plugin-ui'

export default function() {
  try {
    let paneController = MSPreferencesController.sharedController()
    let pane = paneController.currentPreferencePane()
    if (!pane) {
      pane = MSPluginsPreferencePane.alloc().initWithPreferencesController(
        paneController
      )
    }
    pane.pluginManager().reloadPlugins()
    analytics('Done', 1)
    successMessage('Plugins reloaded.')
  } catch (e) {
    console.log(e)
    analytics('Fail')
    return errorMessage('Something went wrong!')
  }
}
