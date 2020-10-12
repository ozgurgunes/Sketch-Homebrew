import analytics from './analytics.js'
import * as UI from './ui.js'

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
    UI.success('Plugins reloaded.')
  } catch (e) {
    console.log(e)
    analytics('Fail')
    return UI.error('Something went wrong!')
  }
}
