import sketch from 'sketch/dom'
import analytics from './analytics.js'
import * as UI from './ui.js'

export default function() {
  try {
    let doc = sketch.getSelectedDocument()
    let selection = doc.selectedLayers
    let images = selection.layers.filter(
      layer => layer.type == sketch.Types.Image
    )
    if (images.length === 0) {
      analytics('Selection Error')
      throw UI.error('Please select images!')
    }
    images.map(layer => {
      layer.sketchObject.setConstrainProportions(0)
      let originalSize = layer.image.nsimage.size()
      let currentAspectRatio = layer.frame.width / layer.frame.height
      let originalAspectRatio = originalSize.width / originalSize.height
      if (currentAspectRatio > originalAspectRatio) {
        layer.frame = layer.frame.scale(
          1,
          currentAspectRatio / originalAspectRatio
        )
      } else {
        layer.frame = layer.frame.scale(
          originalAspectRatio / currentAspectRatio,
          1
        )
      }
      layer.sketchObject.setConstrainProportions(1)
    })
    analytics('Done', images.length)
    UI.success(images.length + ' images reset to aspect ratio.')
  } catch (e) {
    console.log(e)
    return e
  }
}
