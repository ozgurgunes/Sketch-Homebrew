import sketch from 'sketch/dom'
import analytics from '@ozgurgunes/sketch-plugin-analytics'
import { errorMessage, successMessage } from '@ozgurgunes/sketch-plugin-ui'

var selection = sketch.getSelectedDocument().selectedLayers
let skeletonShape = sketch.ShapePath
var skeletonStyle = { fills: ['#000000'], opacity: ['0.05'] }

export default function () {
  let count = selection.length

  if (count < 1) {
    analytics('Selection Error')
    return errorMessage('Please select layers.')
  }

  selection.layers
    .filter(layer => layer.type == sketch.Types.SymbolInstance)
    .forEach(symbol => detach(symbol))

  selection.layers
    .filter(layer => layer.type == sketch.Types.Group)
    .forEach(group => ungroup(group))

  selection.forEach(layer => generate(layer))

  analytics('Skeleton Generated', count)
  return successMessage(
    `${selection.length} skeletons created from ${count} layers.`
  )
}

function ungroup(group) {
  group.layers.forEach(layer => {
    layer.parent = group.parent
    layer.frame.x = layer.frame.x + group.frame.x
    layer.frame.y = layer.frame.y + group.frame.y
    layer.selected = 1
    layer.sketchObject.hasClippingMask = false
    if (layer.type == sketch.Types.Group) {
      ungroup(layer)
    }
  })
  group.remove()
}

function detach(symbol) {
  let group = symbol.detach({ recursively: true })
  group.selected = 1
}

function generate(layer) {
  if (layer.hidden) layer.remove()
  if (layer.locked) layer.locked = false
  switch (layer.type) {
    case 'ShapePath' || 'Shape':
      layer.sharedStyleId = null
      layer.style = skeletonStyle
      break
    case 'Text':
      if (layer.frame.height < 2 * layer.style.fontSize) {
        new skeletonShape({
          parent: layer.parent,
          frame: {
            x: layer.frame.x,
            y: layer.frame.y + (layer.frame.height - layer.style.fontSize) / 2,
            width: layer.frame.width,
            height: layer.style.fontSize,
          },
          style: skeletonStyle,
        })
      } else {
        let lineHeight =
          layer.style.lineHeight || layer.style.getDefaultLineHeight()
        let lines = parseInt(layer.frame.height / lineHeight)
        for (let line = 0; line < lines; line++) {
          let lastWidth = Math.floor(layer.frame.width * 0.66)
          let lastX = layer.frame.x
          switch (layer.style.alignment) {
            case 'center':
              lastX = layer.frame.x + (layer.frame.width - lastWidth) / 2
              break
            case 'right':
              lastX = layer.frame.x + layer.frame.width - lastWidth
              break
          }
          new skeletonShape({
            parent: layer.parent,
            frame: {
              x: line + 1 < lines ? layer.frame.x : lastX,
              y: layer.frame.y + line * lineHeight,
              width: line + 1 < lines ? layer.frame.width : lastWidth,
              height: layer.style.fontSize,
            },
            style: skeletonStyle,
          })
        }
      }
      layer.remove()
      break
    default:
      new skeletonShape({
        parent: layer.parent,
        frame: {
          x: layer.frame.x,
          y: layer.frame.y,
          width: layer.frame.width,
          height: layer.frame.height,
        },
        style: skeletonStyle,
      })
      layer.remove()
      break
  }
}
