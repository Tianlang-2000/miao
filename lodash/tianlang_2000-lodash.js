var tianlang_2000 = {
  compact: function (array) {
    var result = []
    for (var i = 0; i < array.length; i++) {
      if (array[i] !== null && array[i] !== false && array[i] !== undefined && array[i] !== 0 && array[i] !== '' && !Number.isNaN(array[i])) {
        result.push(array[i])
      }
    }
    return result
  },

  chunk: function (array, size) {
    if (!Array.isArray(array) || size <= 0) return []
    const result = []
    for (var i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  },

  fill: function (array, value, start = 0, end = array.length) {
    const result = []
    for (var i = 0; i < array.length; i++) {
      if (start <= i && i < end) {
        result.push(value)
      }else {
        result.push(array[i])
      }
    }
    return result
  },

  drop: function (array, n = 1) {
    if (n >= array.length) {
      return []
    } else {
      return array.slice(n)
    }
  },

  findIndex: function (array, predicate, fromIndex = 0) {
    if (typeof predicate === 'function') {
      for (let i = fromIndex; i < array.length; i++) {
        if (predicate(array[i])) {
          return i
        }
      }
    } else if (typeof predicate === 'object') {
      for (let i = fromIndex; i < array.length; i++) {
        let match = true;
        for (let key in predicate) {
          if (array[i][key] !== predicate[key]) {
            match = false
            break
          }
        }
        if (match) return i
      }
    } else if (typeof predicate === 'string') {
      for (let i = fromIndex; i < array.length; i++) {
        if (array[i][predicate]) {
          return i
        }
      }
    } else if (Array.isArray(predicate)) {
      const [key, value] = predicate
      for (let i = fromIndex; i < array.length; i++) {
        if (array[i][key] === value) {
          return i
        }
      }
    }
  },

  findLastIndex: function (array, predicate, fromIndex = 0) {
    if (typeof predicate === 'function') {
      for (let i = array.length - 1; i >= fromIndex; i--) {
        if (predicate(array[i])) {
          return i
        }
      }
    } else if (typeof predicate === 'object') {
      for (let i = array.length - 1; i >= fromIndex; i--) {
        let match = true;
        for (let key in predicate) {
          if (array[i][key] !== predicate[key]) {
            match = false
            break
          }
        }
        if (match) return i
      }
    } else if (typeof predicate === 'string') {
      for (let i = array.length - 1; i >= fromIndex; i--) {
        if (array[i][predicate]) {
          return i
        }
      }
    } else if (Array.isArray(predicate)) {
      const [key, value] = predicate
      for (let i = array.length - 1; i >= fromIndex; i--) {
        if (array[i][key] === value) {
          return i
        }
      }
    }
  },

  flatten: function (array) {
    let result = []
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        for (let j = 0; j < array[i].length; j++) {
          result.push(array[i][j])
        }
      } else {
        result.push(array[i])
      }
    }
    return result
  },

  flattenDeep: function (array) {
    const result = []

    const flattendeep1 = function(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
          flattendeep1(arr[i])
        } else {
        result.push(arr[i])
        }
      }
    }
    flattendeep1(array)
    return result
  },

  flattenDepth: function (array, depth = 1) {
    
    const flattendepth = function(arr, dep) {
      if (dep === 0) return arr.slice()
      return array.reduce((accumulative, val) => {
        if (Array.isArray(val)) {
          return accumulative.concat(flattendepth(val, dep - 1))
        } else {
          return accumulative.concat(val)
        }
      }, [])
    }
    return flattendepth(array, depth)
  },

  fromPairs: function (pairs) {
    let result = {}
    for (let [key, val] of pairs) {
      result[key] = val
    }
    return result
  },

  toPairs: function (pairs) {
    if (pairs == null) return []

    if (typeof pairs == 'map') {
      return Array.from(pairs.entries())
    }
    if (pairs instanceof Set) {
      return Array.from(pairs, value => [value, value])
    }

    return Object.keys(pairs).map(key => [key, pairs[key]]) 
  },
  
  head: function(array) {
    return array[0]? array[0]: undefined
  },

  indexOf: function(array, value, fromIndex = 1) {
    let index = 1
    for (let i = 0; i < array.length; i++) {
      if (array[i] == value && index == fromIndex) {
        return i
      } else if (array[i] == value) {
        index++
      }
    }
    return -1
  },

  lastIndexOf: function(array, value, fromIndex = 1) {
    let index = 1
    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i] == value && index == fromIndex) {
        return i
      } else if (array[i] == value) {
        index++
      }
    }
    return -1
  },

  initial: function(array) {
    if (array.length == 0) return []
    return array.slice(0, array.length - 1)
  },

  join: function(array, separator) {
    let result = ''
    for (let i = 0; i < array.length; i++) {
      result += array[i] + separator
    }
    return result
  },

  last: function(array) {
    if (array.length == 0) return []
    return array[array.length - 1]
  },

  pull: function(array, ...values) {
    const valueSet = new Set(values)
    let index = 0

    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      if (!valueSet.has(item)) {
        array[index++] = item
      }
    }
    array.slice(0, index)
    return array
  },

  
}
