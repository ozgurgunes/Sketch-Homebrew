import UI from 'sketch/ui'
import analytics from './analytics.js'

const scriptName = "Reload Plugins"

export default function(context) {
  let paneController = MSPreferencesController.sharedController();
  let pane = paneController.currentPreferencePane();
  if (!pane) {
    pane = MSPluginsPreferencePane.alloc().initWithPreferencesController(paneController);
  }
  let pluginManager = pane.pluginManager();
  pluginManager.reloadPlugins();
  analytics(context, scriptName)
  UI.message(scriptName + ": Done!")
}
