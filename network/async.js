function asyncSquare(a, cb) {
  setTimeout(() => {
    cb(null, a * a)
  }, 50 + Math.random() * 10);
}

function asyncMap(arr, asyncMapper, cb) {
  var result = []
  let count = 0
  if (arr.length == 0) {
    cb()
  }
  for (let i = 0; i < arr.length; i++) {
    asyncMapper(arr[i], (err, r) => {
      result[i] = r
      count++
      if (count == arr.length) {
        cb(null, result)
      }
    })
  }
}

asyncMap([1,2,3,4,5], asyncSquare, cb)

function seris(tasks, allDone) {
  
  function done() {
    let count = 0
    let i = 0
    count++
    i++
    if (count == tasks.length) {
      allDone()
    } else {
      tasks[i](done)
    }
  }
  if (task.length == 0) {
      allDone()
  } else {
    tasks[0]
  }
}
