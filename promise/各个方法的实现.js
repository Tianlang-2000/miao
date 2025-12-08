function get(url) {
  return Promise((succeed, reson) => {
    var req = new XMLHttpRequest()
    req.open('get', url, true)
    req.addEventListener('load', function() {
      if (req.statusText < 400) {
        succeed(req.responseText)
      } else {
        reson(new Error('request failed' + req.statusText))
      }
    })
    req.addEventListener('error', function() {
      reson(new Error('nextwork error'))
    })
    req.send(null)
  })
}


function showMessage(msg) {
  var elt = document.createElement('div')
  elt.textContent = msg
  return document.body.appendChild(elt)
}

var loading = showMessage('loading...')
getJSON("example/bert.json").then(function (bert) {
  return getJSON(bert.spouse) 
}).then(function (spouse) {
  return getJSON(spouse.mather)
}).then((mather) => {
  showMessage('' + mather.name)
}).catch((e) => {
  showMessage(String(e))
}).then(() => {
  document.body.removeChild(loading)
})

var story;
getJSON('story.json')
.then(data => {
  story = data
  return getJSON(story.chapters[0])
}) 
.then(c1 => {
  showHTML(c1)
  return getJSON(story.chapters[1])
})
.then(c2 => {
  showHTML(c2)
  return getJSON(story.chapters[2])
})
.then(c3 => {
  showHTML(c3)
  return getJSON(story.chapters[3])
})
.then(c4 => {
  showHTML(c4)
  return getJSON(story.chapters[4])
})
.then(c5 => {
  showHTML(c5)
  return getJSON(story.chapters[5])
})

// 一个请求完了，再立即请求另一个
var p = getJSON('story.json').then(data => {
  var story = data

  for (let c of story.chapters) {
    p = p.then(() => {
      return getJSON(c)
    }).then(ch => {
      showHTML(ch)
    })
  }
})

// 并行请求
var p = getJSON('story.json')
.then( story => {
  let chaptersPromise = story.chaptersUrl.map(chapterUrl => getJSON(chapterUrl))
  return Promise.all(chaptersPromise)
}).then(chapters => {
  for(var chapter of chapters) {
    showHTML(chapter)
  }
})
// 并行请求，串行展示
var p = getJSON('story.json')
.then( story => {
  let chaptersPromise = story.chaptersUrl.map(chapterUrl => getJSON(chapterUrl))
  
  Promise.resolve().then(() => {
    return chaptersPromise[0]
  }).then(chapter => {
    showHTML(chapter)
  }).then(() => {
    return chaptersPromise[1]
  }).then(chapter => {
    showHTML(chapter)
  }).then(() => {
    return chaptersPromise[2]
  }).then(chapter => {
    showHTML(chapter)
  }).then(() => {
    return chaptersPromise[3]
  }).then(chapter => {
    showHTML(chapter)
  }).then(() => {
    return chaptersPromise[4]
  }).then(chapter => {
    showHTML(chapter)
  })
})
// 并行请求，串行展示for循环
var p = getJSON('story.json')
.then( story => {
  let chaptersPromise = story.chaptersUrl.map(chapterUrl => getJSON(chapterUrl))
  var p = Promise.resolve()

  for (let ch of chaptersPromise) {
    p = p.then(
      () => {return ch}
    )
    .then(chapter => {
      showHTML(chapter)
    })
  }

})
// 并行请求，串行展示reduce
var p = getJSON('story.json')
.then( story => {
  let chaptersPromise = story.chaptersUrl.map(chapterUrl => getJSON(chapterUrl))

  // for (let ch of chaptersPromise) {
  //   p = p.then(
  //     () => {return ch}
  //   )
  //   .then(chapter => {
  //     showHTML(chapter)
  //   })
  // }
  return chaptersPromise.reduce((p, ch) = {
    return p.then(() => {
      return ch
    })
    .then(chapter => {
      showHTML(chapter)
    })
  }, Promise.resolve())
})

function resolve(val) {
  return new Promise(resolve => {
    resolve(val)
  })
}

function reject(res) {
  return new Promise((resolve,reject) => {
    reject(res)
  })
} 

function all(promises) {
  return new Promise((resolve, reject) => {
    var result = []
    var count = 0

    if (promises.length == 0) return resolve(result)
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(val => {
        result[i] = val
        count++
        if (count == promises.length) {
          resolve(result)
        }
      }, reason => {
        reject(reason)
      })
    }
  })
}

function race(promises) {
  return new Promise((resolve, reject) => {
    for (let p of promises) {
      Promise.resolve(p).then(val => {
        resolve(val)
      }, rea => {
        reject(rea)
      })
    }
  })
}

function allsettled(promises) {
  return new Promise((resolve) => {
    var result = []
    var count = 0
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(val => {
        result[i] = {
          status: 'fulfilled',
          value: val
        }
        count++
        if (count == promises.length) resolve(result)
      },reason => {
        result[i] = {
          status: 'rejected',
          reason: reason
        }
        count++
        if (count == promises.length) resolve(result)
      })
    }
  })
}


// promiseA+实现（如何兼容其他promise）
function ResolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    reject(new Error())
    return 
  }
  if (x instanceof MyPromise) {
    x.then(resolve, reject)
    return
  }
  if (x && typeof x == 'object' || typeof x == 'function') {
    let call = false
    try{
      let then = x.then 
      
      if (typeof then == 'function') {
        then.call(x, function resolvePromise(y) {
          if (!call) {
            call = true
            ResolvePromise(promise, y, resolve, reject)
          } 
        }, function rejectPromise (r) {
          if (!call) {
            call = true
            reject(r)
          }
        })  
      } else {
        resolve(x)
      }
    } catch(e) {
      if (!call) {
        call = true
        reject(e)
      }
    }
  } else {
    resolve(x)
  }
}
// promisetry
function promiseTry(f, ...args) {
  return new promise((resolve, reject) => {
    resolve(f(...args))
  })
}
// promisewithresolvers
function WithResolvers () {
  var obj = {}

  
}
