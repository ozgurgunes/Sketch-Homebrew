import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import analytics from './analytics.js'

const scriptName = "Reset Image Aspect Ratio"

export default function(context) {

  var doc = sketch.getSelectedDocument()
  var selection = doc.selectedLayers
  var images = selection.layers.filter(layer => layer.type === 'Image')
  var message = "Done!"

  if (images.length === 0) {
    var message = "Select one or more images"
    analytics(context, scriptName, message)
    return UI.message(scriptName + ": " + message)
  }

  images.map(layer => {
    layer.sketchObject.setConstrainProportions(0);
    let originalSize = layer.image.nsimage.size();
    let currentAspectRatio = layer.frame.width / layer.frame.height;
    let originalAspectRatio = originalSize.width / originalSize.height;
    if (currentAspectRatio > originalAspectRatio) {
      layer.frame = layer.frame.scale(1, currentAspectRatio / originalAspectRatio);
    } else {
      layer.frame = layer.frame.scale(originalAspectRatio / currentAspectRatio, 1);
    }
    layer.sketchObject.setConstrainProportions(1);
  });

  analytics(context, scriptName, message)
  UI.message(scriptName + ": " + message)
}
