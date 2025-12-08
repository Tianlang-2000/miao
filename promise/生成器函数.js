function getValue(val, time = 2000) {
  return new Promise(resolve,reject => {
    setTimeout(() => {
      resolve(val)
    }, time)
  })
}

function * foo() {
  let a = yield getValue(2)
  console.log(a)
  let b = yield getValue(6)
  console.log(b)
  return getValue(88, 3000)
}

function run(gen) {
  return new Promise((resolve, reject) => {
    let generate = gen()
    let generated = generate.next()
    step()

    function step(val) {
      if (generated.done == true) {
        resolve(generated.value)
      } else {
        generated.value.then(val => {
          generated = generated.next(val)
          step()
        })
      }
    }
  })
}

function runStandard(genFn) {
  return new Promise((resolve, reject) => {
    let generate = genFn()
    try {
      var generated = generate.next()
      step()
    } catch(e) {
      reject(e)
    }

    function step(val) {
      if (generated.done == true) {
        resolve(generated.value)
      } else {
        generated.value.then(val => {
          try {
            generated.next(val)
            step()
          } catch(e) {
            reject(e)
          }
        }, reason => {
          try {
            generated = generate.throw(reason)
            step()
          } catch(e) {
            reject(e)
          }
        })
      }
    }
  })
}
