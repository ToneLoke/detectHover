console.log('loaded')

document.addEventListener('click', eventFiredFromHover)

var addNodeOnHover = []
var clickedElement = null
var listenerAdded = false

function eventFiredFromHover (e) {
  clickedElement = e.target
  console.log('click', addNodeOnHover)
  var found = false
  for (var i = 0; i < addNodeOnHover.length; i++) {
    if (addNodeOnHover[0] === clickedElement) {
      found = true
      alert('run your callback')
    }
  }
  if (!found && !listenerAdded) {
    clickedElement.parentElement.parentElement.addEventListener('mouseleave', function (e) {
      listenerAdded = true
      var styleTwo = window.getComputedStyle(clickedElement)
      setTimeout(function () {
        if (styleTwo.visibility == 'hidden') {
          listenerAdded = false
          alert('run your callback')
        }
      }, 1000)
    }, {once: true})
  }
}
document.getElementById('hover-js').addEventListener('mouseover', function (e) {
  hoverElement = e.target
  var div = document.createElement('div')
  div.style.width = '100px'
  div.style.height = '50px'
  div.style.background = 'red'
  div.style.position = 'absolute'
  div.style.top = '50px'
  div.style.left = '450px'
  div.style.color = 'white'
  div.id = 'popup'
  div.innerHTML = 'popup'
  div.addEventListener('mouseleave', function (e) {
    var deleteDiv = document.getElementById('popup')

    document.body.removeChild(deleteDiv)
  })
  document.body.appendChild(div)
})
document.addEventListener('mouseover', function (e) {
  var callback = function (mutationsList) {
    // iterate through mutated dom elements
    addNodeOnHover = []
    if (mutationsList[0].addedNodes.length > 0) {
      addNodeOnHover.push(mutationsList[0].addedNodes[0])
    }
  }
  // Create an observer instance linked to the callback function
  var observer = new MutationObserver(callback)
  // Options for the observer (which mutations to observe)
  var config = { childList: true, subtree: true }
  // Start observing the target node for configured mutations
  observer.observe(document.body, config)
  setTimeout(function () {
    observer.disconnect()
  }, 2000)
})
