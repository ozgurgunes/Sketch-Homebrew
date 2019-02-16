import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

export default function() {
  
  const doc = sketch.getSelectedDocument()
  const selection = doc.selectedLayers;

  if (selection.length <= 1) {
    sketch.UI.message("Space Horizontally: Please select at least 2 layers.")
  } 
  else {
    sketch.UI.getInputFromUser("Horizontal Spacing", 
      {
        initialValue: 0,
        description: "Object distance (px):"
      },
      (err, value) => {
        if (err) {
          // most likely the user canceled the input
          return
        }
        else if (!Number(value)) {
          // accept integer only
          sketch.UI.message("Please enter numbers only.")
        }
        else {
          setSpacing(selection, value)
          sketch.UI.message("Horizontal Spacing: " + value + " px")
        }
      }
    )
  }
}

function setSpacing(selection, value){

  var elements = [];
  var left = 0;  
  var count = 0

  // convert selection to standard array
  selection.forEach(layer => {
    elements.push(layer)
  })

  // sort layers by vertical positions
  elements.sort(function(a, b){
    return a.frame.x - b.frame.x
  });
  
  elements.forEach(layer => {
    left = count > 0 ? left : layer.frame.x
    layer.frame.x = left
    left += layer.frame.height + Number(value);
    count++
  })

}
