globalThis.addEventListener('massage', e => {
  var data = e.data
  var result = data * data
  
  postMessage(result)
})
