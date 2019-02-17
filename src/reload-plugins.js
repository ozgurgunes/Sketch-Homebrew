export default function() {

  let paneController = MSPreferencesController.sharedController();
  let pane = paneController.currentPreferencePane();
  if (!pane) {
    pane = MSPluginsPreferencePane.alloc().initWithPreferencesController(paneController);
  }
  let pluginManager = pane.pluginManager();
  pluginManager.reloadPlugins();
  context.document.showMessage("Plugins reloaded!");

}